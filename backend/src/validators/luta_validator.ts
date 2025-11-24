import { z } from "zod";
export const lutaSchema = z.object({
  lutadorAId: z.number().int().positive(),
  lutadorBId: z.number().int().positive(),
  cardId: z.number().int().positive(),
  resultado: z.string().optional(),
});