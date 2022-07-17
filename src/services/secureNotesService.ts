import { CreateSecureNotesData } from "../controllers/secureNoteController.js";
import * as secureNotesRepository from "../repositories/secureNotesRepository.js";
import * as utils from "../utils/utils.js";

export async function createSecureNotes(secureNotesData: CreateSecureNotesData) {
  const { title, userId } = secureNotesData;

  await utils.isTitleValid(title, userId, secureNotesRepository);
  await secureNotesRepository.create(secureNotesData);
};

export async function getAllSecureNotes(userId: number) {
  const secureNotes = await secureNotesRepository.getAll(userId);

  return secureNotes;
};

export async function getSecureNotesById(userId: number, idString: string) {
  const secureNoteId = await utils.isParamsValid(idString);
  const secureNote = await utils.getRepositoryById(userId, secureNoteId, secureNotesRepository);

  return secureNote;
};

export async function deleteSecureNotesById(userId: number, idString: string) {
  const secureNoteId = await utils.isParamsValid(idString);
  await utils.getRepositoryById(userId, secureNoteId, secureNotesRepository);
  await secureNotesRepository.deleteById(secureNoteId);
};