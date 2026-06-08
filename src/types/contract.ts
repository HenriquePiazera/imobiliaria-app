export interface Contract {
  id: string;

  clientId: string;
  clientName?: string;

  propertyId: string;
  propertyTitle?: string;

  type: "sale" | "rent";

  value: number;

  status: "active" | "finished" | "canceled";

  startDate: string;
  endDate?: string;

  createdAt: string;
}