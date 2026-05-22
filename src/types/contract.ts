export interface Contract {
    id: string;
    clientId: string;
    propertyId: string;
  
    value: number;
    status: "active" | "finished" | "canceled";
  
    startDate: string;
    endDate?: string;
  
    createdAt: string;
  }