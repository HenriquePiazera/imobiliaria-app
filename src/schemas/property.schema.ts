import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(3, "Título obrigatório"),

  price: z.coerce
    .number()
    .min(1, "Preço obrigatório"),

  address: z
    .string()
    .min(5, "Endereço obrigatório"),

  bedrooms: z.coerce.number(),

  bathrooms: z.coerce.number(),
});

export type PropertyFormData =
  z.infer<typeof propertySchema>;