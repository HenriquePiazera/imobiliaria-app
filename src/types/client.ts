export type ClientStatus =
  | "lead"
  | "client"
  | "inactive";

export interface Client {
  id: string;

  name: string;
  email: string;
  phone: string;
  document: string;

  city: string;
  state: string;
  address: string;

  status: ClientStatus;

  notes?: string;

  createdAt: string;
}