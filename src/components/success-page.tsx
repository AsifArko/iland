"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Download,
  AlertCircle,
  Loader2,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface DownloadInfo {
  downloadUrl: string;
  title: string;
  version: string;
  fileSize?: number;
  expiresAt?: string;
}

interface SuccessPageProps {
  isPreview?: boolean;
  previewData?: {
    sessionId?: string;
    downloadUrl?: string;
    title?: string;
    version?: string;
    fileSize?: number;
    expiresAt?: string;
  };
}

function SuccessPageContent({
  isPreview = false,
  previewData,
}: SuccessPageProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const sessionIdParam = searchParams.get("session_id"); // Backward compatibility
  const [sessionId, setSessionId] = useState<string | null>(
    isPreview ? previewData?.sessionId || "preview_session_123" : null
  );
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(
    isPreview && previewData
      ? {
          downloadUrl:
            previewData.downloadUrl || "https://example.com/download/preview",
          title: previewData.title || "iLand Source Code",
          version: previewData.version || "1.0.0",
          fileSize: previewData.fileSize || 25,
          expiresAt:
            previewData.expiresAt || new Date(Date.now() + 60000).toISOString(),
        }
      : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(isPreview);

  // Handle preview states
  useEffect(() => {
    if (isPreview && previewData) {
      // Check if the download URL indicates a specific state
      if (previewData.downloadUrl?.includes("loading")) {
        setIsLoading(true);
        setIsDownloadReady(false);
        setError(null);
        setIsExpired(false);
      } else if (previewData.downloadUrl?.includes("error")) {
        setIsLoading(false);
        setIsDownloadReady(false);
        setError("Failed to verify purchase");
        setIsExpired(false);
      } else if (previewData.downloadUrl?.includes("expired")) {
        setIsLoading(false);
        setIsDownloadReady(false);
        setIsExpired(true);
        setError("Download link has expired and cannot be regenerated.");
      } else {
        setIsLoading(false);
        setIsDownloadReady(true);
        setError(null);
        setIsExpired(false);
      }
    }
  }, [isPreview, previewData]);

  const createOrGetProxyUrl = useCallback(async () => {
    if (!sessionId || isPreview) return;

    try {
      const response = await fetch("/api/proxy-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create download link");
      }

      const data = await response.json();

      if (data.success) {
        setDownloadInfo({
          downloadUrl: data.downloadUrl,
          title: "iLand Source Code",
          version: "1.0.0",
          expiresAt: data.expiresAt,
        });
      } else {
        throw new Error("Failed to create download link");
      }
    } catch (err) {
      throw err; // Re-throw to be handled by parent
    }
  }, [sessionId, isPreview]);

  const validateSecureToken = useCallback(
    async (token: string) => {
      if (isPreview) return "preview_session_123";

      try {
        const response = await fetch(`/api/create-secure-token?token=${token}`);
        if (!response.ok) {
          throw new Error("Invalid or expired token");
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error("Invalid token");
        }

        return data.sessionId;
      } catch {
        throw new Error("Failed to validate secure token");
      }
    },
    [isPreview]
  );

  const verifyProxyUrlReady = useCallback(
    async (sessionId: string) => {
      if (isPreview) return;

      // Wait a moment for the database to be updated
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verify the proxy URL exists and is ready
      const response = await fetch(`/api/proxy-url?sessionId=${sessionId}`);
      if (!response.ok) {
        throw new Error("Failed to verify download link");
      }

      const data = await response.json();
      if (!data.success || !data.exists || data.isExpired) {
        throw new Error("Download link not ready");
      }
    },
    [isPreview]
  );

  const ensureProxyUrlReady = useCallback(
    async (sessionId: string) => {
      if (isPreview) return;

      // Step 1: Check if proxy URL exists
      const checkResponse = await fetch(
        `/api/proxy-url?sessionId=${sessionId}`
      );

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();

        if (checkData.success && checkData.exists) {
          if (checkData.isExpired) {
            setIsExpired(true);
            throw new Error(
              "Download link has expired and cannot be regenerated."
            );
          } else {
            // Existing proxy URL is valid, get the full URL
            await createOrGetProxyUrl();
            return;
          }
        }
      }

      // Step 2: No existing proxy URL, create a new one
      await createOrGetProxyUrl();

      // Step 3: Verify the proxy URL was created successfully
      await verifyProxyUrlReady(sessionId);
    },
    [createOrGetProxyUrl, verifyProxyUrlReady, isPreview]
  );

  const checkProxyUrlStatus = useCallback(async () => {
    if (!sessionId || isPreview) return;

    setIsLoading(true);
    setError(null);
    setIsDownloadReady(false);

    try {
      const response = await fetch(`/api/proxy-url?sessionId=${sessionId}`);

      if (response.ok) {
        const data = await response.json();

        if (data.success && data.exists) {
          if (data.isExpired) {
            setIsExpired(true);
            setError("Download link has expired and cannot be regenerated.");
          } else {
            // If we have a valid existing proxy URL, get the full URL
            await createOrGetProxyUrl();
            setIsDownloadReady(true);
          }
        } else {
          // No existing proxy URL found, create a new one for fresh purchase
          await createOrGetProxyUrl();
          setIsDownloadReady(true);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to verify purchase"
      );
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, createOrGetProxyUrl, isPreview]);

  const initializeFromToken = useCallback(async () => {
    if (!token || isPreview) return;

    setIsLoading(true);
    setError(null);
    setIsDownloadReady(false);

    try {
      // Step 1: Validate the secure token and get session ID
      const sessionIdFromToken = await validateSecureToken(token);
      setSessionId(sessionIdFromToken);

      // Step 2: Ensure proxy URL exists and is ready
      await ensureProxyUrlReady(sessionIdFromToken);

      // Step 3: Only now set download as ready
      setIsDownloadReady(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid or expired download link"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, validateSecureToken, ensureProxyUrlReady, isPreview]);

  useEffect(() => {
    if (isPreview) return;

    if (token) {
      // Initialize from secure token
      initializeFromToken();
    } else if (sessionIdParam) {
      // Backward compatibility: direct session ID access
      setSessionId(sessionIdParam);
    }
  }, [token, sessionIdParam, initializeFromToken, isPreview]);

  // Separate effect for handling sessionId changes
  useEffect(() => {
    if (sessionId && !token && !isPreview) {
      // Check proxy URL status with session ID
      checkProxyUrlStatus();
    }
  }, [sessionId, token, checkProxyUrlStatus, isPreview]);

  // Check for expiration
  useEffect(() => {
    if (!downloadInfo?.expiresAt || isPreview) return;

    const checkExpiration = () => {
      const now = new Date().getTime();
      const expiresAt = new Date(downloadInfo.expiresAt!).getTime();
      const timeLeft = expiresAt - now;

      if (timeLeft <= 0) {
        setIsExpired(true);
        setError("Download link has expired and cannot be regenerated.");
        setIsDownloadReady(false);
      }
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, 1000);

    return () => clearInterval(interval);
  }, [downloadInfo?.expiresAt, isPreview]);

  const handleRetryDownload = () => {
    if (!isExpired && !isPreview) {
      createOrGetProxyUrl();
    }
  };

  const initiateDownload = async () => {
    if (isPreview) {
      // In preview mode, just show a success message
      alert("Download initiated! (Preview mode)");
      return;
    }

    if (!isDownloadReady || !downloadInfo?.downloadUrl) {
      setError(
        "Download is not ready yet. Please wait a moment and try again."
      );
      return;
    }

    try {
      // Method 1: Fetch the file and trigger download
      const response = await fetch(downloadInfo.downloadUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Download failed");
      }

      // Get the file blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${downloadInfo.title || "iland-source-code"}.zip`;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      window.URL.revokeObjectURL(url);
    } catch {
      // Method 2: Fallback - open in new tab
      try {
        window.open(downloadInfo.downloadUrl, "_blank");
      } catch {
        setError("Download failed. Please try again.");
      }
    }
  };

  if (!token && !sessionIdParam && !sessionId && !isPreview) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Invalid Access
            </CardTitle>
            <CardDescription>
              No valid download link found. Please check your email or try
              purchasing again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. You can now download your source code.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground">
                {downloadInfo
                  ? "Preparing your download..."
                  : "Verifying your purchase..."}
              </p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
              <Button
                onClick={handleRetryDownload}
                className="w-full"
                disabled={isExpired}
              >
                {isExpired ? "Link Expired" : "Try Again"}
              </Button>
            </div>
          ) : downloadInfo ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-medium text-green-800 mb-2">
                  {downloadInfo.title}
                </h3>
                <p className="text-sm text-green-700">
                  Version: {downloadInfo.version}
                  {downloadInfo.fileSize &&
                    ` • Size: ${downloadInfo.fileSize} MB`}
                </p>
              </div>

              {/* Expiration notice */}
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <Clock className="h-4 w-4 text-amber-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800">
                    Download Link Expires In 1 Minute
                  </p>
                </div>
              </div>

              <Button
                onClick={initiateDownload}
                className="w-full"
                disabled={isExpired || !isDownloadReady}
              >
                <Download className="mr-2 h-4 w-4" />
                {!isDownloadReady
                  ? "Preparing Download..."
                  : isPreview
                    ? "Download Source Code (Preview)"
                    : "Download Source Code (ZIP)"}
              </Button>

              {!isDownloadReady && downloadInfo && (
                <p className="text-xs text-muted-foreground text-center">
                  Please wait while we prepare your download...
                </p>
              )}
            </div>
          ) : null}

          <div className="pt-4 border-t border-border">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPageComponent({
  isPreview = false,
  previewData,
}: SuccessPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <SuccessPageContent isPreview={isPreview} previewData={previewData} />
    </Suspense>
  );
}
