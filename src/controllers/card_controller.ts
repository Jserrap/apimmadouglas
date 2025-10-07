import { Request, Response } from "express";
import * as cardService from "../services/card_service";
import { cardSchema } from "../validators/card_validator";

export const getAll = async (req: Request, res: Response) => {
  const cards = await cardService.getAllCards();
  res.json(cards);
};

export const getOne = async (req: Request, res: Response) => {
  const card = await cardService.getCardById(Number(req.params.id));
  if (!card) return res.status(404).json({ error: "Not found" });
  res.json(card);
};

export const create = async (req: Request, res: Response) => {
  const parse = cardSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error });
  const card = await cardService.createCard({ ...req.body, data: new Date(req.body.data) });
  res.status(201).json(card);
};

export const update = async (req: Request, res: Response) => {
  const parse = cardSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error });
  try {
    const card = await cardService.updateCard(Number(req.params.id), { ...req.body, data: new Date(req.body.data) });
    res.json(card);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await cardService.deleteCard(Number(req.params.id));
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
};