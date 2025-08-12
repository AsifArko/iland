import React from "react";
import { Card, Text, Stack, Heading } from "@sanity/ui";
import { Clock } from "lucide-react";
import { TokenItem } from "./token-item";
import { TokenInfo } from "./types";

interface TokensSectionProps {
  tokens: TokenInfo[];
}

export function TokensSection({ tokens }: TokensSectionProps) {
  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={2}>
          <Clock style={{ display: "inline", marginRight: "8px" }} />
          Active Download Tokens
        </Heading>

        {tokens.length === 0 ? (
          <Text size={2} muted>
            No active tokens found
          </Text>
        ) : (
          <Stack space={3}>
            {tokens.map(token => (
              <TokenItem key={token.token} token={token} />
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
