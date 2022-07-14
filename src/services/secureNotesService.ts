import { CreateSecureNotesData } from "../controllers/secureNoteController.js";
import * as secureNotesRepository from "../repositories/secureNotesRepository.js";
import * as utils from "../utils/utils.js";

export async function createSecureNotes(secureNotesData: CreateSecureNotesData) {
  const { title, userId } = secureNotesData;

  await isTitleValid(title, userId);

  await secureNotesRepository.createSecureNote(secureNotesData);

};

async function isTitleValid(title: string, userId: number) {
  const result = await secureNotesRepository.getByTitleAndId(title, userId);
  if (result) await utils.errorTypes("conflict", "Title already registered");
};

