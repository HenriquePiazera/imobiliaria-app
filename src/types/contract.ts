export type ContractType = "rent" | "sale";

export type ContractStatus = "active" | "finished" | "canceled";

export interface Contract {
  id: string;

  clientId: string;
  propertyId: string;

  clientName?: string;
  propertyTitle?: string;

  type: ContractType;

  value: number;

  status: ContractStatus;

  startDate: string;
  endDate?: string;

  createdAt: string;
}