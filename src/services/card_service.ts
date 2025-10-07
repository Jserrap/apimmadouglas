import { prisma } from "../models/prismaClient";
import { Card } from "@prisma/client";

export async function getAllCards() {
  return prisma.card.findMany();
}

export async function getCardById(id: number) {
  return prisma.card.findUnique({
    where: { id },
    include: { lutas: { include: { lutadorA: true, lutadorB: true } } },
  });
}

export async function createCard(data: Omit<Card, "id">) {
  return prisma.card.create({ data });
}

export async function updateCard(id: number, data: Omit<Card, "id">) {
  return prisma.card.update({ where: { id }, data });
}

export async function deleteCard(id: number) {
  return prisma.card.delete({ where: { id } });
}