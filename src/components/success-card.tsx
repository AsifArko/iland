"use client";

import { useEffect, useState, useCallback } from "react";
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

interface SuccessCardProps {
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

export function SuccessCard({
  isPreview = false,
  previewData,
}: SuccessCardProps) {
  // For preview mode, we don't need URL parameters
  const [downloadInfo] = useState<DownloadInfo | null>(
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

  // For preview mode, we don't need API calls
  const createOrGetProxyUrl = useCallback(async () => {
    if (isPreview) return;
    // This would be implemented for real usage
  }, [isPreview]);

  // For preview mode, we don't need URL parameter handling
  // The component will be controlled by the preview data

  // For preview mode, we don't need URL parameter effects

  useEffect(() => {
    if (!downloadInfo?.expiresAt) return;

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
  }, [downloadInfo?.expiresAt]);

  const handleRetryDownload = () => {
    if (!isExpired && !isPreview) {
      createOrGetProxyUrl();
    }
  };

  const initiateDownload = async () => {
    if (isPreview) {
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
      const response = await fetch(downloadInfo.downloadUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
              link.download = `${downloadInfo.title || "iland-source-code"}.zip`;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch {
      try {
        window.open(downloadInfo.downloadUrl, "_blank");
      } catch {
        setError("Download failed. Please try again.");
      }
    }
  };

  return (
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
  );
}
