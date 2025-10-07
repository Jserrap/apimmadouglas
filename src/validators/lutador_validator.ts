import { z } from "zod";
export const lutadorSchema = z.object({
  nome: z.string().min(2),
  pais: z.string().min(2),
  categoria: z.string().min(2),
});