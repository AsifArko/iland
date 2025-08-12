import React, { useEffect, useState } from "react";
import { useClient } from "sanity";
import { Button, Card, Stack, Text, Badge } from "@sanity/ui";

interface ProxyUrl {
  _id: string;
  sessionId: string;
  filename: string;
  downloadCount: number;
  expiresAt: string;
  isExpired: boolean;
  createdAt: string;
}

export default function ProxyUrls() {
  const client = useClient();
  const [proxyUrls, setProxyUrls] = useState<ProxyUrl[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProxyUrls = React.useCallback(async () => {
    try {
      const urls = await client.fetch(`
        *[_type == "proxyUrl"] | order(createdAt desc) {
          _id,
          sessionId,
          filename,
          downloadCount,
          expiresAt,
          isExpired,
          createdAt
        }
      `);
      setProxyUrls(urls);
    } catch (error) {
      console.error("Error fetching proxy URLs:", error);
    } finally {
      setLoading(false);
    }
  }, [client]);

  const regenerateProxyUrl = async (sessionId: string) => {
    try {
      const response = await fetch("/api/proxy-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        await fetchProxyUrls(); // Refresh the list
      } else {
        console.error("Failed to regenerate proxy URL");
      }
    } catch (error) {
      console.error("Error regenerating proxy URL:", error);
    }
  };

  useEffect(() => {
    fetchProxyUrls();
  }, [client, fetchProxyUrls]);

  if (loading) {
    return (
      <Card padding={4}>
        <Text>Loading proxy URLs...</Text>
      </Card>
    );
  }

  return (
    <Stack space={4} padding={4}>
      <Text size={3} weight="semibold">
        Proxy URL Management
      </Text>

      {proxyUrls.length === 0 ? (
        <Card padding={4} tone="caution">
          <Text>No proxy URLs found.</Text>
        </Card>
      ) : (
        <Stack space={3}>
          {proxyUrls.map(url => {
            const expiresAt = new Date(url.expiresAt);
            const isExpiredByTime = expiresAt < new Date();
            const isExpired = url.isExpired || isExpiredByTime;

            return (
              <Card key={url._id} padding={3} border radius={2}>
                <Stack space={2}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      Session: {url.sessionId.substring(0, 20)}...
                    </Text>
                    <Badge tone={isExpired ? "critical" : "positive"}>
                      {isExpired ? "Expired" : "Active"}
                    </Badge>
                  </Stack>

                  <Text size={1}>File: {url.filename}</Text>

                  <Stack space={3}>
                    <Text size={0}>Downloads: {url.downloadCount}</Text>
                    <Text size={0}>Expires: {expiresAt.toLocaleString()}</Text>
                    <Text size={0}>
                      Created: {new Date(url.createdAt).toLocaleString()}
                    </Text>
                  </Stack>

                  {!isExpired && (
                    <Button
                      mode="ghost"
                      size={0}
                      text="Regenerate"
                      onClick={() => regenerateProxyUrl(url.sessionId)}
                    />
                  )}
                </Stack>
              </Card>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
