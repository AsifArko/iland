import React from "react";
import { Card, Text, Stack, Flex } from "@sanity/ui";
import { Cpu, HardDrive, MemoryStick } from "lucide-react";

interface SystemHealthProps {
  cpu: number;
  memory: number;
  disk: number;
}

export function SystemHealth({ cpu, memory, disk }: SystemHealthProps) {
  const getTone = (value: number) => {
    if (value < 50) return "positive";
    if (value < 80) return "caution";
    return "critical";
  };

  const getStatus = (value: number) => {
    if (value < 50) return "Good";
    if (value < 80) return "Warning";
    return "Critical";
  };

  const getProgressColor = (value: number) => {
    if (value > 80) return "rgba(239, 68, 68, 0.8)"; // Less intense red with transparency
    if (value > 60) return "rgba(245, 158, 11, 0.8)"; // Less intense orange with transparency
    return "rgba(16, 185, 129, 0.8)"; // Less intense green with transparency
  };

  return (
    <Stack space={3}>
      {/* CPU Usage */}
      <Card padding={4} radius={3} shadow={1} tone={getTone(cpu)}>
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={2}>
              <Cpu size={16} />
              <Text size={1} weight="semibold">
                CPU Usage
              </Text>
            </Flex>
            <Text
              size={1}
              weight="bold"
              style={{ color: getProgressColor(cpu) }}
            >
              {cpu.toFixed(1)}%
            </Text>
          </Flex>
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#f3f4f6",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${(cpu / 100) * 100}%`,
                height: "100%",
                backgroundColor: getProgressColor(cpu),
                borderRadius: "4px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <Text size={0} muted style={{ textAlign: "center" }}>
            Status: {getStatus(cpu)}
          </Text>
        </Stack>
      </Card>

      {/* Memory Usage */}
      <Card padding={4} radius={3} shadow={1} tone={getTone(memory)}>
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={2}>
              <MemoryStick size={16} />
              <Text size={1} weight="semibold">
                Memory Usage
              </Text>
            </Flex>
            <Text
              size={1}
              weight="bold"
              style={{ color: getProgressColor(memory) }}
            >
              {memory.toFixed(1)}%
            </Text>
          </Flex>
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#f3f4f6",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${(memory / 100) * 100}%`,
                height: "100%",
                backgroundColor: getProgressColor(memory),
                borderRadius: "4px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <Text size={0} muted style={{ textAlign: "center" }}>
            Status: {getStatus(memory)}
          </Text>
        </Stack>
      </Card>

      {/* Disk Usage */}
      <Card padding={4} radius={3} shadow={1} tone={getTone(disk)}>
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={2}>
              <HardDrive size={16} />
              <Text size={1} weight="semibold">
                Disk Usage
              </Text>
            </Flex>
            <Text
              size={1}
              weight="bold"
              style={{ color: getProgressColor(disk) }}
            >
              {disk.toFixed(1)}%
            </Text>
          </Flex>
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#f3f4f6",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${(disk / 100) * 100}%`,
                height: "100%",
                backgroundColor: getProgressColor(disk),
                borderRadius: "4px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <Text size={0} muted style={{ textAlign: "center" }}>
            Status: {getStatus(disk)}
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
}
