"use client";

import { useMemo } from "react";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { RecentContracts } from "@/components/dashboard/RecentContracts";
import { SeedDemoButton } from "@/components/dashboard/SeedDemoButton";

import { useClients } from "@/hooks/useClients";
import { useContracts } from "@/hooks/useContracts";
import { useProperties } from "@/hooks/useProperties";

export default function DashboardPage() {
  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: properties = [], isLoading: propertiesLoading } =
    useProperties();
  const { data: contracts = [], isLoading: contractsLoading } =
    useContracts();

  const loading =
    clientsLoading || propertiesLoading || contractsLoading;

  const leads = useMemo(
    () => clients.filter((client) => client.status === "lead").length,
    [clients]
  );

  const inactiveClients = useMemo(
    () => clients.filter((client) => client.status === "inactive").length,
    [clients]
  );

  const availableProperties = useMemo(
    () =>
      properties.filter((property) => property.status === "Disponível")
        .length,
    [properties]
  );

  const rentedProperties = useMemo(
    () =>
      properties.filter((property) => property.status === "Alugado").length,
    [properties]
  );

  const soldProperties = useMemo(
    () =>
      properties.filter((property) => property.status === "Vendido").length,
    [properties]
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-zinc-500">Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-500">Visão geral da imobiliária</p>
        </div>

        <SeedDemoButton
          hasData={
            clients.length > 0 ||
            properties.length > 0 ||
            contracts.length > 0
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Clientes" value={clients.length} />
        <DashboardCard title="Leads" value={leads} />
        <DashboardCard title="Inativos" value={inactiveClients} />
        <DashboardCard title="Imóveis" value={properties.length} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Contratos" value={contracts.length} />
        <DashboardCard
          title="Imóveis disponíveis"
          value={availableProperties}
        />
        <DashboardCard title="Imóveis alugados" value={rentedProperties} />
        <DashboardCard title="Imóveis vendidos" value={soldProperties} />
      </div>

      <RecentContracts
        contracts={contracts}
        clients={clients}
        properties={properties}
      />

      <FinancialSummary contracts={contracts} />
    </div>
  );
}
