import React from "react";
import { Card, Text, Stack, Flex, Badge } from "@sanity/ui";
import { TokenInfo } from "./types";
import { formatDate, getTimeRemaining } from "./utils";

interface TokenItemProps {
  token: TokenInfo;
}

export function TokenItem({ token }: TokenItemProps) {
  return (
    <Card padding={3} radius={2} border>
      <Flex align="center" justify="space-between">
        <Stack space={2}>
          <Flex align="center" gap={2}>
            <Text
              size={2}
              weight="semibold"
              style={{ fontFamily: "monospace" }}
            >
              {token.token}
            </Text>
            <Badge
              tone={token.isExpired ? "critical" : "positive"}
              mode="outline"
            >
              {token.isExpired ? "Expired" : "Active"}
            </Badge>
          </Flex>
          <Text size={1} muted>
            Session: {token.sessionId}
          </Text>
          <Text size={1} muted>
            Expires: {formatDate(token.expiresAt)}
          </Text>
        </Stack>

        {!token.isExpired && (
          <Text size={1} weight="semibold">
            {getTimeRemaining(token.expiresAt)} remaining
          </Text>
        )}
      </Flex>
    </Card>
  );
}
