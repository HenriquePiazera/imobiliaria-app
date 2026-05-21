export type DashboardStat = {
    id: string;
    label: string;
    value: number;
    type: "number" | "currency" | "text";
  };