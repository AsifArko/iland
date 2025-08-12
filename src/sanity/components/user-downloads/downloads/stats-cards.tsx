import React from "react";
import { Card, Text, Stack, Flex } from "@sanity/ui";
import { DownloadInfo, TokenInfo } from "./types";
import { formatCurrency } from "./utils";

interface StatsCardsProps {
  downloads: DownloadInfo[];
  tokens: TokenInfo[];
}

export function StatsCards({ downloads, tokens }: StatsCardsProps) {
  const totalRevenue = downloads.reduce((sum, d) => sum + d.amount, 0);
  const activeDownloads = downloads.filter(d => d.hasActiveToken).length;
  const activeTokens = tokens.filter(t => !t.isExpired).length;

  return (
    <Flex gap={3} wrap="wrap" style={{ marginBottom: "24px" }}>
      <Card
        padding={3}
        radius={2}
        shadow={1}
        style={{ flex: "1", minWidth: "200px" }}
      >
        <Stack space={2}>
          <Text size={1} weight="semibold" muted>
            Total Orders
          </Text>
          <Text size={4} weight="bold">
            {downloads.length}
          </Text>
        </Stack>
      </Card>
      <Card
        padding={3}
        radius={2}
        shadow={1}
        style={{ flex: "1", minWidth: "200px" }}
      >
        <Stack space={2}>
          <Text size={1} weight="semibold" muted>
            Active Downloads
          </Text>
          <Text size={4} weight="bold">
            {activeDownloads}
          </Text>
        </Stack>
      </Card>
      <Card
        padding={3}
        radius={2}
        shadow={1}
        style={{ flex: "1", minWidth: "200px" }}
      >
        <Stack space={2}>
          <Text size={1} weight="semibold" muted>
            Active Tokens
          </Text>
          <Text size={4} weight="bold">
            {activeTokens}
          </Text>
        </Stack>
      </Card>
      <Card
        padding={3}
        radius={2}
        shadow={1}
        style={{ flex: "1", minWidth: "200px" }}
      >
        <Stack space={2}>
          <Text size={1} weight="semibold" muted>
            Total Revenue
          </Text>
          <Text size={4} weight="bold">
            {formatCurrency(totalRevenue, downloads[0]?.currency || "usd")}
          </Text>
        </Stack>
      </Card>
    </Flex>
  );
}
