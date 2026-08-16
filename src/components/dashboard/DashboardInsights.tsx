import { Client } from "@/types/client";
import { Contract } from "@/types/contract";
import { Property } from "@/types/property";
import { formatCurrency } from "@/utils/formatCurrency";
import { getExpiringContracts } from "@/utils/contract-dates";

type DashboardInsightsProps = {
  clients: Client[];
  properties: Property[];
  contracts: Contract[];
};

export function DashboardInsights({
  clients,
  properties,
  contracts,
}: DashboardInsightsProps) {
  const activeClients = clients.filter(
    (client) => client.status === "client"
  ).length;

  const activeContracts = contracts.filter(
    (contract) => contract.status === "active"
  ).length;

  const activeRentContracts = contracts.filter(
    (contract) =>
      contract.status === "active" && contract.type === "rent"
  );

  const averageRent =
    activeRentContracts.length > 0
      ? activeRentContracts.reduce(
          (total, contract) => total + contract.value,
          0
        ) / activeRentContracts.length
      : 0;

  const rentedProperties = properties.filter(
    (property) => property.status === "Alugado"
  ).length;

  const occupancyRate =
    properties.length > 0
      ? Math.round((rentedProperties / properties.length) * 100)
      : 0;

  const expiringCount = getExpiringContracts(contracts).length;

  const conversionRate =
    clients.length > 0
      ? Math.round((activeClients / clients.length) * 100)
      : 0;

  const insights = [
    {
      label: "Contratos ativos",
      value: String(activeContracts),
      detail: "Aluguel e venda em andamento",
    },
    {
      label: "Ticket médio (aluguel)",
      value: formatCurrency(averageRent),
      detail: "Média dos contratos de aluguel ativos",
    },
    {
      label: "Taxa de ocupação",
      value: `${occupancyRate}%`,
      detail: `${rentedProperties} de ${properties.length} imóveis alugados`,
    },
    {
      label: "Conversão lead → cliente",
      value: `${conversionRate}%`,
      detail: `${activeClients} clientes ativos no CRM`,
    },
    {
      label: "Vencimentos próximos",
      value: String(expiringCount),
      detail: "Contratos de aluguel nos próximos 30 dias",
      alert: expiringCount > 0,
    },
  ];

  return (
    <div className="theme-card rounded-2xl border border-zinc-200 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Indicadores operacionais</h2>
        <p className="text-sm text-zinc-500">
          Métricas para acompanhamento da carteira
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className={`rounded-xl border p-4 ${
              insight.alert
                ? "border-amber-200 bg-amber-50"
                : "border-zinc-200 bg-zinc-50"
            }`}
          >
            <p className="text-sm text-zinc-500">{insight.label}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {insight.value}
            </p>
            <p className="mt-2 text-xs text-zinc-500">{insight.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
