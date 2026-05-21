import { Card } from "@/components/ui/Card";

type MetricCardProps = {
  label: string;
  value: number;
};

export function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <Card>
      <div className="space-y-2">
        <p className="text-sm text-zinc-500">
          {label}
        </p>

        <p className="text-3xl font-bold text-zinc-900">
          {value}
        </p>
      </div>
    </Card>
  );
}