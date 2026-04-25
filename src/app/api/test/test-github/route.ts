import { NextResponse } from "next/server";

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

    if (!githubToken) {
      return NextResponse.json({
        error: "GitHub token not configured",
        hasToken: false,
      });
    }

    // Test the token by making a simple API call
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return NextResponse.json({
        success: true,
        hasToken: true,
        tokenLength: githubToken.length,
        tokenPrefix: githubToken.substring(0, 4),
        user: userData.login,
        message: "GitHub token is working correctly",
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        error: "GitHub token is invalid or expired",
        hasToken: true,
        tokenLength: githubToken.length,
        status: response.status,
        statusText: response.statusText,
        details: errorText,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Failed to test GitHub token",
      hasToken: !!process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
