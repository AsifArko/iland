"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface EmailSenderProps {
  customerEmail: string;
  downloadUrl: string;
  customerName?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function EmailSender({
  customerEmail,
  downloadUrl,
  customerName,
  onSuccess,
  onError,
  className,
  variant = "ghost",
  size = "icon",
}: EmailSenderProps) {
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendEmail = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      const error = "Invalid email address";
      setErrorMessage(error);
      setShowError(true);
      onError?.(error);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!downloadUrl) {
      const error = "Missing download URL";
      setErrorMessage(error);
      setShowError(true);
      onError?.(error);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Check if download URL is valid
    if (
      !downloadUrl.includes("/api/download-proxy") ||
      !downloadUrl.includes("sessionId=")
    ) {
      const error = "Invalid download URL";
      setErrorMessage(error);
      setShowError(true);
      onError?.(error);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsSending(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const response = await fetch("/api/send-download-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          downloadUrl,
          customerName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      setShowSuccess(true);
      onSuccess?.();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to send email";
      setErrorMessage(errorMsg);
      setShowError(true);
      onError?.(errorMsg);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleSendEmail}
        disabled={isSending}
        variant={variant}
        size={size}
        className={className}
        title="Send download link via email"
      >
        {isSending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : showSuccess ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : showError ? (
          <AlertCircle className="h-4 w-4 text-red-600" />
        ) : (
          <Mail className="h-4 w-4" />
        )}
      </Button>

      {/* Error tooltip */}
      {showError && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-red-100 border border-red-300 rounded-md shadow-lg z-50 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-3 w-3 text-red-600" />
            <span className="text-xs text-red-700">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Success tooltip */}
      {showSuccess && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-green-100 border border-green-300 rounded-md shadow-lg z-50 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-700">Email sent!</span>
          </div>
        </div>
      )}
    </div>
  );
}
