import React from "react";
import { Button } from "@sanity/ui";
import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export function RefreshButton({ onRefresh, refreshing }: RefreshButtonProps) {
  return (
    <Button
      mode="ghost"
      icon={RefreshCw}
      onClick={onRefresh}
      disabled={refreshing}
      text={refreshing ? "Refreshing..." : "Refresh"}
    />
  );
}
