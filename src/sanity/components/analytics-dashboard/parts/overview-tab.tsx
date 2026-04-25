import React from "react";
import { Eye, Users, Activity, TrendingUp } from "lucide-react";
import MetricCard from "./metric-card";

interface AnalyticsData {
  pageViews: Record<string, unknown>[];
  userEvents: Record<string, unknown>[];
  errorLogs: Record<string, unknown>[];
  conversionEvents: Record<string, unknown>[];
}

interface OverviewTabProps {
  data: AnalyticsData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Page Views"
        value={data.pageViews.length}
        description="+20.1% from last month"
        icon={<Eye className="h-4 w-4 text-muted-foreground" />}
      />

      <MetricCard
        title="Active Users"
        value={new Set(data.userEvents.map(e => e.sessionId)).size}
        description="Unique sessions today"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />

      <MetricCard
        title="System Health"
        value={
          data.errorLogs.filter(
            e => e.severity === "critical" || e.severity === "high"
          ).length
        }
        description="Critical/High errors"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />

      <MetricCard
        title="Conversions"
        value={data.conversionEvents.length}
        description="Total conversions"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default OverviewTab;
