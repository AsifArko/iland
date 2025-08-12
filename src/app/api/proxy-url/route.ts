import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity";
import crypto from "crypto";

// Generate a secure download token
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// GitHub API helper for private repository downloads
async function getGitHubDownloadUrl(
  gitUrl: string,
  branch: string,
  token?: string
) {
  try {
    // Extract owner and repo from gitUrl
    const urlMatch = gitUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!urlMatch) {
      throw new Error("Invalid GitHub URL format");
    }

    const [, owner, repo] = urlMatch;

    if (token) {
      // For private repos, we need to use GitHub API with authentication
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/zipball/${branch}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (response.status === 302 || response.status === 301) {
        // GitHub API returns a redirect URL for the actual download
        const downloadUrl = response.headers.get("location");
        if (downloadUrl) {
          return downloadUrl;
        }
      } else if (response.ok) {
        // If status is 200, it might be a direct response
        return apiUrl;
      }

      // If we get here, something went wrong
      const errorText = await response.text();
      console.error("GitHub API error details:", errorText);

      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    } else {
      // For public repos, use direct archive URL
      return `${gitUrl}/archive/${branch}.zip`;
    }
  } catch (error) {
    console.error("Error generating GitHub download URL:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, expiryMinutes } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Default to 1 minute if not specified, max 60 minutes
    const minutes = expiryMinutes
      ? Math.min(Math.max(1, expiryMinutes), 60)
      : 1;

    // Check if a valid, unexpired proxy URL already exists
    const existingProxyUrl = await serverClient.fetch(
      `*[_type == "proxyUrl" && sessionId == $sessionId && isExpired == false && expiresAt > $now][0]`,
      {
        sessionId,
        now: new Date().toISOString(),
      }
    );

    // If expiryMinutes is provided (admin renewal), always create a new token
    // If expiryMinutes is not provided (customer payment), use existing token if available
    if (existingProxyUrl && !expiryMinutes) {
      // Return existing proxy URL if it's still valid (without token in URL)
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const proxyUrl = `${baseUrl}/api/download-proxy?url=${encodeURIComponent(existingProxyUrl.downloadUrl)}&filename=${encodeURIComponent(existingProxyUrl.filename)}&sessionId=${sessionId}`;

      return NextResponse.json({
        success: true,
        downloadUrl: proxyUrl,
        expiresAt: existingProxyUrl.expiresAt,
        isExpired: false,
      });
    }

    // Verify the order exists and is completed
    const order = await serverClient.fetch(
      `*[_type == "order" && stripeSessionId == $sessionId && status == "completed"][0]`,
      { sessionId }
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or not completed" },
        { status: 404 }
      );
    }

    // Get the latest active download
    const download = await serverClient.fetch(
      `*[_type == "download" && isActive == true] | order(createdAt desc)[0]`
    );

    if (!download || !download.gitRepository) {
      return NextResponse.json(
        { error: "No active download found" },
        { status: 404 }
      );
    }

    // Generate GitHub download URL
    const { url: gitUrl, branch } = download.gitRepository;
    const cleanGitUrl = gitUrl.endsWith("/") ? gitUrl.slice(0, -1) : gitUrl;
    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

    if (!githubToken) {
      console.error("GitHub Personal Access Token not configured");
      return NextResponse.json(
        { error: "GitHub configuration missing. Please contact support." },
        { status: 500 }
      );
    }

    const apiUrl = await getGitHubDownloadUrl(cleanGitUrl, branch, githubToken);

    // Note: We don't mark old tokens as expired here since the admin API
    // will pick the most recent non-expired token based on createdAt

    // Generate new token and expiration
    const token = generateToken();
    const expiresAt = new Date(Date.now() + minutes * 60 * 1000);

    // Create proxy URL record in Sanity with retry logic

    let proxyUrlDoc = null;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries && !proxyUrlDoc) {
      try {
        console.log(`Attempt ${retryCount + 1} to create proxy URL...`);

        proxyUrlDoc = await serverClient.create({
          _type: "proxyUrl",
          sessionId,
          downloadUrl: apiUrl,
          filename: `${download.title || "iland-source-code"}.zip`,
          token,
          expiresAt: expiresAt.toISOString(),
          isExpired: false,
          downloadCount: 0,
          order: {
            _type: "reference",
            _ref: order._id,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        console.log("Proxy URL created successfully:", proxyUrlDoc._id);
        break;
      } catch (sanityError) {
        retryCount++;
        console.error(
          `Sanity create error (attempt ${retryCount}):`,
          sanityError
        );

        if (retryCount >= maxRetries) {
          throw new Error(
            `Failed to create proxy URL in Sanity after ${maxRetries} attempts: ${sanityError}`
          );
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }

    // Check if proxy URL was created successfully
    if (!proxyUrlDoc) {
      console.error("Failed to create proxy URL after all retry attempts");
      throw new Error("Failed to create proxy URL in database");
    }

    // Verify the proxy URL was actually created in Sanity
    console.log("Verifying proxy URL creation in Sanity...");
    let verificationAttempts = 0;
    const maxVerificationAttempts = 5;
    let verifiedProxyUrl = null;

    while (
      verificationAttempts < maxVerificationAttempts &&
      !verifiedProxyUrl
    ) {
      try {
        // Wait a bit before checking
        await new Promise(resolve =>
          setTimeout(resolve, 500 * (verificationAttempts + 1))
        );

        verifiedProxyUrl = await serverClient.fetch(
          `*[_type == "proxyUrl" && sessionId == $sessionId && _id == $proxyUrlId][0]`,
          { sessionId, proxyUrlId: proxyUrlDoc._id }
        );

        if (verifiedProxyUrl) {
          console.log("Proxy URL verified in Sanity:", verifiedProxyUrl._id);
          break;
        } else {
          console.log(
            `Verification attempt ${verificationAttempts + 1} failed - proxy URL not found`
          );
        }
      } catch (error) {
        console.error(
          `Verification attempt ${verificationAttempts + 1} error:`,
          error
        );
      }

      verificationAttempts++;
    }

    if (!verifiedProxyUrl) {
      console.error("Failed to verify proxy URL creation after all attempts");
      throw new Error("Proxy URL creation verification failed");
    }

    // Create the proxy URL (without token in URL to avoid truncation)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const proxyUrl = `${baseUrl}/api/download-proxy?url=${encodeURIComponent(apiUrl)}&filename=${encodeURIComponent(proxyUrlDoc.filename)}&sessionId=${sessionId}`;

    return NextResponse.json({
      success: true,
      downloadUrl: proxyUrl,
      expiresAt: expiresAt.toISOString(),
      isExpired: false,
      proxyUrlId: proxyUrlDoc._id, // Include the ID for verification
    });
  } catch (error) {
    console.error("Error creating proxy URL:", error);
    return NextResponse.json(
      { error: "Failed to create proxy URL" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get proxy URL status
    const proxyUrl = await serverClient.fetch(
      `*[_type == "proxyUrl" && sessionId == $sessionId][0]`,
      { sessionId }
    );

    if (!proxyUrl) {
      return NextResponse.json({
        success: true,
        exists: false,
        isExpired: true,
      });
    }

    // Check if expired by time (don't update the flag, just check dynamically)
    const now = new Date();
    const expiresAt = new Date(proxyUrl.expiresAt);
    const isExpiredByTime = expiresAt <= now;

    return NextResponse.json({
      success: true,
      exists: true,
      isExpired: isExpiredByTime, // Only check time, don't use the stored flag
      expiresAt: proxyUrl.expiresAt,
      downloadCount: proxyUrl.downloadCount || 0,
    });
  } catch (error) {
    console.error("Error checking proxy URL status:", error);
    return NextResponse.json(
      { error: "Failed to check proxy URL status" },
      { status: 500 }
    );
  }
}
