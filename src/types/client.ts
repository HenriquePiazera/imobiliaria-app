export type ClientStatus =
  | "lead"
  | "service"
  | "proposal"
  | "closed"
  | "lost";

export interface Client {
  id: string;

  name: string;

  email: string;

  phone: string;

  document: string;

  city: string;

  state: string;

  address: string;

  notes?: string;

  status: ClientStatus;

  createdAt: string;
}