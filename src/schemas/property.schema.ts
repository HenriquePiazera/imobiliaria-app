import { z } from "zod";

export const propertySchema =
  z.object({
    title: z
      .string()
      .min(3),

    price: z.coerce
      .number()
      .min(1),

    type: z
      .string()
      .min(2),

    city: z
      .string()
      .min(2),

    bedrooms: z.coerce
      .number()
      .min(0),

    bathrooms: z.coerce
      .number()
      .min(0),

    area: z.coerce
      .number()
      .min(1),
  });

export type PropertyFormData =
  z.infer<
    typeof propertySchema
  >;