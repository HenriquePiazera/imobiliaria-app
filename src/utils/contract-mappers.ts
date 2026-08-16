import { Contract } from "@/types/contract";
import { CreateContractDTO } from "@/repositories/contracts/contract.repository";

export function toCreateContractDTO(
  contract: Contract
): CreateContractDTO {
  return {
    ownerId: contract.ownerId,
    clientId: contract.clientId,
    propertyId: contract.propertyId,
    clientName: contract.clientName,
    propertyTitle: contract.propertyTitle,
    type: contract.type,
    value: contract.value,
    status: contract.status,
    startDate: contract.startDate,
    endDate: contract.endDate,
  };
}

export function toUpdateContractDTO(
  contract: Contract
): Partial<Contract> {
  return {
    clientId: contract.clientId,
    propertyId: contract.propertyId,
    clientName: contract.clientName,
    propertyTitle: contract.propertyTitle,
    type: contract.type,
    value: contract.value,
    status: contract.status,
    startDate: contract.startDate,
    endDate: contract.endDate,
  };
}
