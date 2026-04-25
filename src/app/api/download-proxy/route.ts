import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const downloadUrl = searchParams.get("url");
    const filename = searchParams.get("filename") || "iland-source-code.zip";
    const sessionId = searchParams.get("sessionId");

    if (!downloadUrl) {
      return NextResponse.json(
        { error: "Download URL is required" },
        { status: 400 }
      );
    }

    // Validate the download using sessionId
    if (sessionId) {
      // Get proxy URL from Sanity
      const proxyUrl = await serverClient.fetch(
        `*[_type == "proxyUrl" && sessionId == $sessionId] | order(createdAt desc)[0]`,
        { sessionId }
      );

      if (!proxyUrl) {
        return NextResponse.json(
          { error: "Invalid or expired download token" },
          { status: 401 }
        );
      }

      // Check if expired (only check time, ignore stored flag)
      const now = new Date();
      const expiresAt = new Date(proxyUrl.expiresAt);

      if (expiresAt <= now) {
        return NextResponse.json(
          { error: "Invalid or expired download token" },
          { status: 401 }
        );
      }

      // Update download count
      await serverClient
        .patch(proxyUrl._id)
        .set({ downloadCount: (proxyUrl.downloadCount || 0) + 1 })
        .commit();
    } else {
      // If no sessionId is provided, this might be a direct access attempt
      return NextResponse.json(
        { error: "Valid session required" },
        { status: 401 }
      );
    }

    // Get GitHub token for private repository access
    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

    if (!githubToken) {
      console.error("GitHub Personal Access Token not configured");
      return NextResponse.json(
        { error: "GitHub configuration missing. Please contact support." },
        { status: 500 }
      );
    }

    // Fetch the file from GitHub with authentication
    const response = await fetch(downloadUrl, {
      headers: {
        "User-Agent": "iLand-Download-Proxy/1.0",
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      console.error(
        "Download proxy error:",
        response.status,
        response.statusText
      );
      return NextResponse.json(
        {
          error: `Failed to download file: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    // Get the file content
    const fileBuffer = await response.arrayBuffer();

    // Return the file as a download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": fileBuffer.byteLength.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy download" },
      { status: 500 }
    );
  }
}
