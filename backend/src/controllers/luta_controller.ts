import { Request, Response } from "express";
import * as lutaService from "../services/luta_service";
import { lutaSchema } from "../validators/luta_validator";

export const getAll = async (req: Request, res: Response) => {
  const lutas = await lutaService.getAllLutas();
  res.json(lutas);
};

export const getOne = async (req: Request, res: Response) => {
  const luta = await lutaService.getLutaById(Number(req.params.id));
  if (!luta) return res.status(404).json({ error: "Not found" });
  res.json(luta);
};

export const create = async (req: Request, res: Response) => {
  const parse = lutaSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error });
  const luta = await lutaService.createLuta(req.body);
  res.status(201).json(luta);
};

export const update = async (req: Request, res: Response) => {
  const parse = lutaSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error });
  try {
    const luta = await lutaService.updateLuta(Number(req.params.id), req.body);
    res.json(luta);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await lutaService.deleteLuta(Number(req.params.id));
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
};