export type Contract = {
    id: string;
    propertyId: string;
    clientId: string;
    value: number;
    status: "active" | "finished";
  };