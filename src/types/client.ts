export interface Client {
  id: string;

  name: string;

  email: string;

  phone: string;

  createdAt: string;

  cpf?: string;

  city?: string;

  state?: string;

  address?: string;

  notes?: string;
}