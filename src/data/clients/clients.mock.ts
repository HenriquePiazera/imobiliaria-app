import { Client } from "@/domain/clients/client.types";

export const clientsMock: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "11999999999",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria@email.com",
    phone: "11888888888",
    createdAt: new Date(),
  },
];