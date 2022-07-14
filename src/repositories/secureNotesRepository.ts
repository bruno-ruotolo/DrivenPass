import prisma from "../config/db.js";

import { CreateSecureNotesData } from "../controllers/secureNoteController.js";

export async function createSecureNote(secureNotesData: CreateSecureNotesData) {
  await prisma.secureNotes.create({ data: secureNotesData });
};

export async function getByTitleAndId(title: string, userId: number) {
  return await prisma.secureNotes.findFirst({ where: { userId, title } });
};
