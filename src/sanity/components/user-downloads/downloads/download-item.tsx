import React from "react";
import { Card, Text, Stack, Flex, Badge, Box, Button } from "@sanity/ui";
import {
  Mail,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { DownloadInfo } from "./types";
import {
  formatDate,
  formatCurrency,
  getTimeRemaining,
  copyToClipboard,
  getUrlTypeLabel,
} from "./utils";

interface DownloadItemProps {
  download: DownloadInfo;
}

const getUrlTypeIcon = (urlType: string) => {
  switch (urlType) {
    case "active_download":
      return <CheckCircle size={16} />;
    case "expired_redirect":
    case "no_token":
      return <AlertCircle size={16} />;
    default:
      return <ExternalLink size={16} />;
  }
};

export function DownloadItem({ download }: DownloadItemProps) {
  return (
    <Card padding={3} radius={2} border>
      <Stack space={3}>
        <Flex align="center" justify="space-between">
          <Stack space={2}>
            <Flex align="center" gap={2}>
              <Mail size={16} />
              <Text size={2} weight="semibold">
                {download.customerEmail}
              </Text>
            </Flex>
            <Text size={1} muted>
              Session: {download.sessionId}
            </Text>
            <Text size={1} muted>
              Order: {download.orderId}
            </Text>
            <Text size={1} muted>
              Amount: {formatCurrency(download.amount, download.currency)}
            </Text>
          </Stack>
          <Stack space={2}>
            <Badge
              tone={download.hasActiveToken ? "positive" : "critical"}
              mode="outline"
            >
              {download.hasActiveToken ? "Active" : "Expired"}
            </Badge>
            <Text size={1} muted>
              Created: {formatDate(download.createdAt)}
            </Text>
          </Stack>
        </Flex>

        <Box>
          <Flex align="center" gap={2} style={{ marginBottom: "8px" }}>
            {getUrlTypeIcon(download.urlType)}
            <Text size={1} weight="semibold">
              {getUrlTypeLabel(download.urlType)}:
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Text
              size={1}
              style={{
                fontFamily: "monospace",
                backgroundColor: "#f5f5f5",
                padding: "4px 8px",
                borderRadius: "4px",
                flex: "1",
                wordBreak: "break-all",
              }}
            >
              {download.downloadUrl}
            </Text>
            <Button
              mode="ghost"
              icon={ExternalLink}
              onClick={() => copyToClipboard(download.downloadUrl)}
              text="Copy"
              size={1}
            />
          </Flex>
        </Box>

        {download.tokenInfo && (
          <Box>
            <Text size={1} weight="semibold" style={{ marginBottom: "4px" }}>
              Token Info:
            </Text>
            <Text
              size={1}
              style={{
                fontFamily: "monospace",
                backgroundColor: "#f0f0f0",
                padding: "4px 8px",
                borderRadius: "4px",
                wordBreak: "break-all",
              }}
            >
              {download.tokenInfo.token}
            </Text>
            {!download.tokenInfo.isExpired && (
              <Flex align="center" gap={2} style={{ marginTop: "8px" }}>
                <Clock size={16} />
                <Text size={1}>
                  Expires in: {getTimeRemaining(download.tokenInfo.expiresAt)}
                </Text>
              </Flex>
            )}
          </Box>
        )}
      </Stack>
    </Card>
  );
}
