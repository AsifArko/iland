import React, { useState } from "react";
import { Card, Stack, Text, Flex, Box } from "@sanity/ui";
import SuccessPageComponent from "@/components/success-page";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, AlertTriangle, Clock } from "lucide-react";

export function SuccessPreview() {
  const [previewMode, setPreviewMode] = useState<
    "success" | "loading" | "error" | "expired"
  >("success");

  const getPreviewData = () => {
    const baseData = {
      sessionId: "preview_session_123",
              title: "iLand Source Code",
      version: "1.0.0",
      fileSize: 25,
    };

    switch (previewMode) {
      case "loading":
        return {
          ...baseData,
          downloadUrl: "https://example.com/download/loading",
          expiresAt: new Date(Date.now() + 60000).toISOString(),
        };
      case "error":
        return {
          ...baseData,
          downloadUrl: "https://example.com/download/error",
          expiresAt: new Date(Date.now() + 60000).toISOString(),
        };
      case "expired":
        return {
          ...baseData,
          downloadUrl: "https://example.com/download/expired",
          expiresAt: new Date(Date.now() - 60000).toISOString(), // Expired 1 minute ago
        };
      default:
        return {
          ...baseData,
          downloadUrl: "https://example.com/download/success",
          expiresAt: new Date(Date.now() + 60000).toISOString(),
        };
    }
  };

  const getStateIcon = (state: string) => {
    switch (state) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      case "expired":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card padding={3} radius={1} tone="default">
      <Stack space={4}>
        {/* Preview Controls */}
        <Card padding={3} radius={1}>
          <Stack space={3}>
            <Text size={2} weight="semibold">
              Success Card Preview
            </Text>
            <Text size={1} muted>
              Preview different states of the success card
            </Text>
            <Flex gap={2} wrap="wrap">
              {(["success", "loading", "error", "expired"] as const).map(
                state => (
                  <Button
                    key={state}
                    variant={previewMode === state ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode(state)}
                    className="flex items-center gap-2"
                  >
                    {getStateIcon(state)}
                    {state.charAt(0).toUpperCase() + state.slice(1)} State
                  </Button>
                )
              )}
            </Flex>
          </Stack>
        </Card>

        {/* Preview Frame */}
        <Box
          style={{
            border: "none",
            borderRadius: "4px",
            overflow: "hidden",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "448px" }}>
            <SuccessPageComponent
              isPreview={true}
              previewData={getPreviewData()}
            />
          </div>
        </Box>
      </Stack>
    </Card>
  );
}
