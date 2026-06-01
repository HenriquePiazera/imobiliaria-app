import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(3, "Título muito curto"),

  type: z
    .string()
    .min(2, "Tipo obrigatório"),

  purpose: z.enum([
    "Venda",
    "Aluguel",
  ]),

  price: z.coerce
    .number()
    .min(1, "Preço obrigatório"),

  city: z
    .string()
    .min(2, "Cidade obrigatória"),

  district: z
    .string()
    .min(2, "Bairro obrigatório"),

  status: z.enum([
    "Disponível",
    "Vendido",
    "Alugado",
  ]),

  description: z
    .string()
    .min(5, "Descrição obrigatória"),
});

export type PropertyFormData =
  z.infer<typeof propertySchema>;