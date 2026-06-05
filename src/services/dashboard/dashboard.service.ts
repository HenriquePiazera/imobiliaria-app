import { DashboardStat } from "@/domain/dashboard/dashboard.types";

import { ClientRepository } from "@/repositories/clients/client.repository";
import { PropertyRepository } from "@/repositories/properties/property.repository";
import { ContractRepository } from "@/repositories/contracts/contract.repository";

const propertyRepository =
  new PropertyRepository();

const contractRepository =
  new ContractRepository();

export class DashboardService {
  async getDashboardStats(): Promise<DashboardStat[]> {
    const [
      clients,
      properties,
      contracts,
    ] = await Promise.all([
      ClientRepository.getClients(),
      propertyRepository.getProperties(),
      contractRepository.getContracts(),
    ]);

    const soldProperties = properties.filter(
      (property) =>
        property.status === "Vendido"
    );

    return [
      {
        id: crypto.randomUUID(),
        label: "Clientes",
        value: clients.length,
        type: "number",
      },
      {
        id: crypto.randomUUID(),
        label: "Imóveis",
        value: properties.length,
        type: "number",
      },
      {
        id: crypto.randomUUID(),
        label: "Contratos",
        value: contracts.length,
        type: "number",
      },
      {
        id: crypto.randomUUID(),
        label: "Imóveis vendidos",
        value: soldProperties.length,
        type: "number",
      },
    ];
  }
}