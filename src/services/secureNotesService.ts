import { CreateSecureNotesData } from "../controllers/secureNoteController.js";
import * as secureNotesRepository from "../repositories/secureNotesRepository.js";
import * as utils from "../utils/utils.js";

//SERVICES
export async function createSecureNotes(secureNotesData: CreateSecureNotesData) {
  const { title, userId } = secureNotesData;

  await isTitleValid(title, userId);
  await secureNotesRepository.create(secureNotesData);

};

export async function getAllSecureNotes(userId: number) {
  const secureNotes = await secureNotesRepository.getAll(userId);

  return secureNotes;
};

export async function getSecureNotesById(userId: number, idString: string) {
  const secureNoteId = await utils.isParamsValid(idString);
  const secureNote = await getSecureNotes(userId, secureNoteId)

  return secureNote;
};

export async function deleteSecureNotesById(userId: number, idString: string) {
  const secureNoteId = await utils.isParamsValid(idString);
  await getSecureNotes(userId, secureNoteId)
  await secureNotesRepository.deleteById(secureNoteId);
};

//AUXILIARY FUNCTIONS
async function isTitleValid(title: string, userId: number) {
  const result = await secureNotesRepository.getByTitleAndId(title, userId);
  if (result) await utils.errorTypes("conflict", "Title already registered");
};

async function getSecureNotes(userId: number, id: number) {
  const result = await secureNotesRepository.getById(userId, id);
  if (!result) await utils.errorTypes(
    "unauthorized",
    "This Element Doesn't Exist or You're not Authorized to Access"
  );
  return result;
};
