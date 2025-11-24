import { prisma } from "../models/prismaClient";
import { Lutador } from "@prisma/client";

export async function getAllLutadores() {
  return prisma.lutador.findMany();
}

export async function getLutadorById(id: number) {
  return prisma.lutador.findUnique({
    where: { id },
    include: { lutasA: true, lutasB: true },
  });
}

export async function createLutador(data: Omit<Lutador, "id">) {
  return prisma.lutador.create({ data });
}

export async function updateLutador(id: number, data: Omit<Lutador, "id">) {
  return prisma.lutador.update({ where: { id }, data });
}

export async function deleteLutador(id: number) {
  return prisma.lutador.delete({ where: { id } });
}