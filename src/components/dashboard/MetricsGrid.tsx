import { DashboardStat } from "@/domain/dashboard/dashboard.types";

import { MetricCard }
from "./MetricCard";

type MetricsGridProps = {
  stats: DashboardStat[];
};

export function MetricsGrid({
  stats,
}: MetricsGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
    >
      {stats.map((stat) => (
        <MetricCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  );
}