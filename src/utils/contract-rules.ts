import { ContractStatus, ContractType } from "@/types/contract";

export function resolvePropertyStatus(
  contractType: ContractType,
  contractStatus: ContractStatus
): "Disponível" | "Alugado" | "Vendido" {
  if (contractStatus === "active") {
    return contractType === "sale" ? "Vendido" : "Alugado";
  }

  if (contractStatus === "finished") {
    return contractType === "sale" ? "Vendido" : "Disponível";
  }

  return "Disponível";
}
