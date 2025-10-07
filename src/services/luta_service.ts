import { prisma } from "../models/prismaClient";
import { Luta } from "@prisma/client";

export async function getAllLutas() {
  return prisma.luta.findMany({
    include: { lutadorA: true, lutadorB: true, card: true },
  });
}

export async function getLutaById(id: number) {
  return prisma.luta.findUnique({
    where: { id },
    include: { lutadorA: true, lutadorB: true, card: true },
  });
}

export async function createLuta(data: Omit<Luta, "id">) {
  return prisma.luta.create({ data });
}

export async function updateLuta(id: number, data: Omit<Luta, "id">) {
  return prisma.luta.update({ where: { id }, data });
}

export async function deleteLuta(id: number) {
  return prisma.luta.delete({ where: { id } });
}