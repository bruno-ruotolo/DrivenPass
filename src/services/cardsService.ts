import Cryptr from "cryptr";

import * as cardsRepository from "../repositories/cardsRepository.js";
import * as utils from "../utils/utils.js";
import { CreateCardData } from "../controllers/cardsController.js";
import { Cards } from "@prisma/client";

//SERVICES
export async function createCards(cardsData: CreateCardData) {
  const { title, userId, password, cvv, expirationDate } = cardsData;

  await isExpirationDateValid(expirationDate);
  await isTitleValid(title, userId);

  const passwordHash = await encryptElement(password);
  const cvvHash = await encryptElement(cvv);

  await cardsRepository.create({ ...cardsData, password: passwordHash, cvv: cvvHash });
};

export async function getAllCards(userId: number) {
  const cards = await cardsRepository.getAll(userId);
  const cardsDecrypted = await decryptElementsMap(cards);

  return cardsDecrypted;
};

export async function getCardsById(userId: number, idString: string) {
  const cardId = await utils.isParamsValid(idString);
  const cards = await getCards(userId, cardId)
  const cardsDecrypted = await decryptElements(cards);

  return cardsDecrypted;
};

export async function deleteCardsById(userId: number, cardsIdString: string) {
  const cardsId = await utils.isParamsValid(cardsIdString);
  await getCards(userId, cardsId)
  await cardsRepository.deleteById(cardsId);
};

//AUXILIARY FUNCTIONS
async function isTitleValid(title: string, userId: number) {
  const result = await cardsRepository.getByTitleAndId(title, userId);
  if (result) await utils.errorTypes("conflict", "Title already registered");
};

async function isExpirationDateValid(expirationDate: string) {
  const month = parseInt(expirationDate.slice(0, 2));
  if (month <= 0 || month > 12) {
    return await utils.errorTypes("unprocessable_entity", "The expiration date is invalid");
  };
};

async function encryptElement(element: string) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const encryptElement = cryptr.encrypt(element);
  return encryptElement;
};

async function getCards(userId: number, id: number) {
  const result = await cardsRepository.getById(userId, id);
  if (!result) await utils.errorTypes(
    "unauthorized",
    "This Element Doesn't Exist or You're not Authorized to Access"
  );
  return result;
};

async function decryptElementsMap(elements: Cards[]) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const elementDecrypted = elements.map(element => {
    const decryptPassword = cryptr.decrypt(element.password);
    const decryptCVV = cryptr.decrypt(element.cvv);
    return { ...element, password: decryptPassword, cvv: decryptCVV };
  });

  return elementDecrypted;
};

async function decryptElements(element: Cards) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const decryptPassword = cryptr.decrypt(element.password);
  const decryptCVV = cryptr.decrypt(element.cvv);
  const elementDecrypted = { ...element, password: decryptPassword, cvv: decryptCVV };

  return elementDecrypted;
};
