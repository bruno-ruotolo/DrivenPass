import { Cards } from "@prisma/client";
import Cryptr from "cryptr";

import { CreateCardData } from "../controllers/cardsController.js";
import * as cardsRepository from "../repositories/cardsRepository.js";
import * as utils from "../utils/utils.js";

//SERVICES
export async function createCards(cardsData: CreateCardData) {
  const { title, userId, password, cvv, expirationDate } = cardsData;

  await isExpirationDateValid(expirationDate);
  await utils.isTitleValid(title, userId, cardsRepository);

  const passwordHash = await utils.encryptElement(password);
  const cvvHash = await utils.encryptElement(cvv);

  await cardsRepository.create({ ...cardsData, password: passwordHash, cvv: cvvHash });
};

export async function getAllCards(userId: number) {
  const cards = await cardsRepository.getAll(userId);
  const cardsDecrypted = await decryptCardsMap(cards);

  return cardsDecrypted;
};

export async function getCardsById(userId: number, idString: string) {
  const cardId = await utils.isParamsValid(idString);
  const card = await utils.getRepositoryById(userId, cardId, cardsRepository);
  const cardDecrypted = await decryptCard(card);

  return cardDecrypted;
};

export async function deleteCardsById(userId: number, cardsIdString: string) {
  const cardsId = await utils.isParamsValid(cardsIdString);
  await utils.getRepositoryById(userId, cardsId, cardsRepository);
  await cardsRepository.deleteById(cardsId);
};

//AUXILIARY FUNCTIONS
async function isExpirationDateValid(expirationDate: string) {
  const month = parseInt(expirationDate.slice(0, 2));
  if (month <= 0 || month > 12) {
    return await utils.errorTypes("unprocessable_entity", "The expiration date is invalid");
  };
};

async function decryptCardsMap(cards: Cards[]) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const cardsDecrypted = cards.map(card => {
    const decryptPassword = cryptr.decrypt(card.password);
    const decryptCVV = cryptr.decrypt(card.cvv);
    return { ...card, password: decryptPassword, cvv: decryptCVV };
  });

  return cardsDecrypted;
};

async function decryptCard(card: Cards) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const decryptPassword = cryptr.decrypt(card.password);
  const decryptCVV = cryptr.decrypt(card.cvv);
  const elementDecrypted = { ...card, password: decryptPassword, cvv: decryptCVV };

  return elementDecrypted;
};
