import { Request, Response } from "express";
import * as lutadorService from "../services/lutador_service";
import { lutadorSchema } from "../validators/lutador_validator";

export const getAll = async (req: Request, res: Response) => {
  const lutadores = await lutadorService.getAllLutadores();
  res.json(lutadores);
};

export const getOne = async (req: Request, res: Response) => {
  const lutador = await lutadorService.getLutadorById(Number(req.params.id));
  if (!lutador) return res.status(404).json({ error: "Not found" });
  res.json(lutador);
};

export const create = async (req: Request, res: Response) => {
  const parse = lutadorSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error });
  const lutador = await lutadorService.createLutador(req.body);
  res.status(201).json(lutador);
};

export const update = async (req: Request, res: Response) => {
  const parse = lutadorSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error });
  try {
    const lutador = await lutadorService.updateLutador(Number(req.params.id), req.body);
    res.json(lutador);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await lutadorService.deleteLutador(Number(req.params.id));
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
};