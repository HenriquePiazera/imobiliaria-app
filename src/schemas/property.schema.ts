import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3),
  type: z.string().min(2),

  purpose: z.enum(["Venda", "Aluguel"]),

  price: z.number().min(1),

  city: z.string().min(2),
  district: z.string().min(2),

  status: z.enum(["Disponível", "Vendido", "Alugado"]),

  description: z.string().min(5),

  imageUrl: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;