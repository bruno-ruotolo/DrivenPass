import prisma from "../config/db.js";

import { CreateSecureNotesData } from "../controllers/secureNoteController.js";

export async function create(data: CreateSecureNotesData) {
  await prisma.secureNotes.create({ data });
};

export async function getByTitleAndId(title: string, userId: number) {
  return await prisma.secureNotes.findFirst({
    where: { userId, title: { contains: title, mode: 'insensitive' } }
  });
};

export async function getAll(userId: number) {
  return await prisma.secureNotes.findMany({ where: { userId } });
};

export async function getById(userId: number, id: number) {
  return await prisma.secureNotes.findFirst({ where: { userId, id } });
};

export async function deleteById(id: number) {
  return await prisma.secureNotes.delete({ where: { id } });
};

