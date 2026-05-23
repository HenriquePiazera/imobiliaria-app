import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(3, "Título obrigatório"),

  type: z
    .string()
    .min(2, "Tipo obrigatório"),

  city: z
    .string()
    .min(2, "Cidade obrigatória"),

  price: z.coerce
    .number()
    .min(1, "Preço obrigatório"),

  area: z.coerce
    .number()
    .min(1, "Área obrigatória"),

  bedrooms: z.coerce
    .number()
    .min(0, "Quantidade inválida"),

  bathrooms: z.coerce
    .number()
    .min(0, "Quantidade inválida"),

  status: z.enum([
    "available",
    "rented",
    "reserved",
    "inactive",
  ]),
});

export type PropertyFormData =
  z.infer<typeof propertySchema>;