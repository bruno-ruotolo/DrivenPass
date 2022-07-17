import prisma from "../config/db.js";

import { CreateCardData } from "../controllers/cardsController.js";

export async function create(data: CreateCardData) {
  await prisma.cards.create({ data });
};

export async function getByTitleAndId(title: string, userId: number) {
  return await prisma.cards.findFirst({
    where: { userId, title: { contains: title, mode: 'insensitive' } }
  });
};

export async function getAll(userId: number) {
  return await prisma.cards.findMany({ where: { userId } });
};

export async function getById(userId: number, id: number) {
  return await prisma.cards.findFirst({ where: { userId, id } });
};

export async function deleteById(id: number) {
  return await prisma.cards.delete({ where: { id } });
};
