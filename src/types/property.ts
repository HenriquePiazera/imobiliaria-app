export interface Property {
  id: string;

  title: string;

  type: string;

  purpose: "Venda" | "Aluguel";

  price: number;

  city: string;

  district: string;

  status:
    | "Disponível"
    | "Vendido"
    | "Alugado";

  description: string;

  imageUrl?: string;

  createdAt: string;
}