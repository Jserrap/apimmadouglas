import { z } from "zod";
export const cardSchema = z.object({
  nome: z.string().min(2),
  data: z.string(),
});