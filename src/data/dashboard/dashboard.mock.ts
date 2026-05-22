import { DashboardStat } from "@/domain/dashboard/dashboard.types";

export const dashboardMock: DashboardStat[] = [
  {
    id: "1",
    label: "Imóveis cadastrados",
    value: 12,
    type: "number",
  },
  {
    id: "2",
    label: "Clientes ativos",
    value: 8,
    type: "number",
  },
  {
    id: "3",
    label: "Contratos ativos",
    value: 5,
    type: "number",
  },
  {
    id: "4",
    label: "Vendas realizadas",
    value: 3,
    type: "number",
  },
];