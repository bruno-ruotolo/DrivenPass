import { SecureNotes } from "@prisma/client";
import { Request, Response } from "express";

import * as secureNotesService from "../services/secureNotesService.js"

export type CreateSecureNotesData = Omit<SecureNotes, "id" | "createdAt">;
interface Id { id: number; };

export async function createSecureNotes(req: Request, res: Response) {
  console.log("🚀 ~ file: secureNoteController.ts ~ line 12 ~ createSecureNotes ~ res.locals.token", res.locals.token)

  const { id: userId }: Id = res.locals.token;
  const secureNotesData: CreateSecureNotesData = { userId, ...req.body };

  await secureNotesService.createSecureNotes(secureNotesData);

  res.sendStatus(201);
};

export async function getAllSecureNotes(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;

  const secureNotes = await secureNotesService.getAllSecureNotes(userId);

  res.status(200).send(secureNotes);
};

export async function getSecureNotesById(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const { id: secureNotesIdString } = req.params;

  const secureNotes = await secureNotesService.getSecureNotesById(userId, secureNotesIdString);

  res.status(200).send(secureNotes);
};

export async function deleteSecureNotesById(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const { id: secureNotesIdString } = req.params;

  await secureNotesService.deleteSecureNotesById(userId, secureNotesIdString);

  res.sendStatus(200);
};