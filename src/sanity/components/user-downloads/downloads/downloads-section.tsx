import React from "react";
import { Card, Text, Stack, Heading } from "@sanity/ui";
import { Mail } from "lucide-react";
import { DownloadItem } from "./download-item";
import { DownloadInfo } from "./types";

interface DownloadsSectionProps {
  downloads: DownloadInfo[];
}

export function DownloadsSection({ downloads }: DownloadsSectionProps) {
  return (
    <Card padding={4} radius={2} shadow={1} style={{ marginBottom: "24px" }}>
      <Stack space={4}>
        <Heading size={2}>
          <Mail style={{ display: "inline", marginRight: "8px" }} />
          Recent Downloads
        </Heading>

        {downloads.length === 0 ? (
          <Text size={2} muted>
            No downloads found
          </Text>
        ) : (
          <Stack space={3}>
            {downloads.map(download => (
              <DownloadItem key={download.sessionId} download={download} />
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
