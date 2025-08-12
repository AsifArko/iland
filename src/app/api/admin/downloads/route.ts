import { NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity";

interface DownloadInfo {
  sessionId: string;
  customerEmail: string;
  downloadUrl: string;
  originalDownloadUrl: string;
  urlType: string;
  expiresAt: string | null;
  isExpired: boolean;
  createdAt: string;
  orderId: string;
  amount: number;
  currency: string;
  hasActiveToken: boolean;
  tokenInfo: {
    token: string;
    expiresAt: string;
    isExpired: boolean;
  } | null;
}

export async function GET() {
  try {
    // Only allow in development or with proper authentication
    if (process.env.NODE_ENV !== "development") {
      // In production, you should implement proper authentication
      // For now, we'll allow it but you should add authentication
      console.warn(
        "Admin downloads endpoint accessed in production without authentication"
      );
    }

    // Fetch all completed orders from Sanity
    const orders = await serverClient.fetch(`
      *[_type == "order" && status == "completed"] | order(createdAt desc) {
        _id,
        stripeSessionId,
        customerEmail,
        amount,
        currency,
        status,
        createdAt,
        updatedAt
      }
    `);

    // Get proxy URLs from Sanity - get the most recent active one for each session
    const proxyUrls = await serverClient.fetch(`
      *[_type == "proxyUrl"] | order(isExpired asc, createdAt desc) {
        sessionId,
        token,
        expiresAt,
        isExpired,
        downloadCount,
        createdAt
      }
    `);

    const proxyUrlMap = new Map();
    proxyUrls.forEach((proxyUrl: Record<string, unknown>) => {
      // Only set if we haven't seen this sessionId before (prioritize non-expired tokens)
      if (!proxyUrlMap.has(proxyUrl.sessionId)) {
        proxyUrlMap.set(proxyUrl.sessionId, proxyUrl);
      }
    });

    // Get the latest active download configuration
    const downloadConfig = await serverClient.fetch(`
      *[_type == "download" && isActive == true] | order(createdAt desc)[0] {
        title,
        gitRepository {
          url,
          branch
        }
      }
    `);

    // Combine order data with proxy URL information
    const downloads: DownloadInfo[] = orders.map(
      (order: Record<string, unknown>) => {
        const proxyUrl = proxyUrlMap.get(order.stripeSessionId);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        // Check if proxy URL is actually expired by comparing with current time
        const now = new Date();
        const isActuallyExpired = proxyUrl
          ? new Date(proxyUrl.expiresAt) <= now
          : true;

        // Debug logging for token status
        if (proxyUrl) {
          console.log(`Session ${order.stripeSessionId}:`);
          console.log(`  - Proxy URL exists: ${!!proxyUrl}`);
          console.log(`  - Expires at: ${proxyUrl.expiresAt}`);
          console.log(`  - Current time: ${now.toISOString()}`);
          console.log(`  - Is actually expired: ${isActuallyExpired}`);
          console.log(`  - Is marked as expired: ${proxyUrl.isExpired}`);
          console.log(
            `  - Has active token: ${!!proxyUrl && !isActuallyExpired}`
          );
        }

        // Create the original download URL (the actual file download link for administrators)
        const githubUrl = downloadConfig?.gitRepository?.url
          ? `${downloadConfig.gitRepository.url}/archive/${downloadConfig.gitRepository.branch}.zip`
          : "GITHUB_URL";
        const originalDownloadUrl = `${baseUrl}/api/download-proxy?url=${encodeURIComponent(githubUrl)}&filename=${encodeURIComponent(downloadConfig?.title || "iland-source-code")}.zip&sessionId=${order.stripeSessionId}`;

        // Create different types of URLs based on proxy URL status
        let downloadUrl = "";
        let urlType = "";

        if (proxyUrl && !isActuallyExpired) {
          // Active proxy URL - create the actual download URL
          downloadUrl = originalDownloadUrl;
          urlType = "active_download";
        } else if (proxyUrl && isActuallyExpired) {
          // Expired proxy URL - show the success page URL
          downloadUrl = `${baseUrl}/success?session_id=${order.stripeSessionId}`;
          urlType = "expired_redirect";
        } else {
          // No proxy URL - show the success page URL
          downloadUrl = `${baseUrl}/success?session_id=${order.stripeSessionId}`;
          urlType = "no_proxy_url";
        }

        return {
          sessionId: order.stripeSessionId || "unknown",
          customerEmail: order.customerEmail || "no-email@example.com",
          downloadUrl: downloadUrl,
          originalDownloadUrl: originalDownloadUrl,
          urlType: urlType,
          expiresAt: proxyUrl?.expiresAt || null,
          isExpired: isActuallyExpired,
          createdAt: order.createdAt || new Date().toISOString(),
          orderId: order._id || "unknown",
          amount: order.amount || 0,
          currency: order.currency || "usd",
          hasActiveToken: !!proxyUrl && !isActuallyExpired,
          tokenInfo: proxyUrl
            ? {
                token: proxyUrl.token,
                expiresAt: proxyUrl.expiresAt,
                isExpired: isActuallyExpired,
              }
            : null,
        };
      }
    );

    return NextResponse.json({
      downloads,
      totalDownloads: downloads.length,
      activeDownloads: downloads.filter((d: DownloadInfo) => d.hasActiveToken)
        .length,
      expiredDownloads: downloads.filter((d: DownloadInfo) => !d.hasActiveToken)
        .length,
      downloadConfig: downloadConfig,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching admin downloads:", error);
    return NextResponse.json(
      { error: "Failed to fetch download information" },
      { status: 500 }
    );
  }
}
