import { Credentials, Wifi } from "@prisma/client";
import Cryptr from "cryptr";

import { Type } from "../middlewares/handleErrorMiddleware.js"

interface Repository {
  create: Function;
  deleteById: Function;
  getAll: Function;
  getById: Function;
  getByTitleAndId?: Function;
};

//AUXILIARY FUNCTIONS UTILS
export async function encryptElement(element: string) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const encryptElement = cryptr.encrypt(element);
  return encryptElement;
};

export async function decryptPasswordMap(elements: Credentials[] | Wifi[]) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const elementDecrypted = elements.map(element => {
    const decryptPassword = cryptr.decrypt(element.password);
    return { ...element, password: decryptPassword };
  });

  return elementDecrypted;
};

export async function decryptPassword(element: Credentials | Wifi) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const decryptPassword = cryptr.decrypt(element.password);
  const elementDecrypted = { ...element, password: decryptPassword };

  return elementDecrypted;
};

export async function getRepositoryById(userId: number, id: number, repository: Repository) {
  const result = await repository.getById(userId, id);
  if (!result) await unauthorizedElementError();
  return result;
};

export async function isParamsValid(idString: string) {
  const pattern = /[a-z]|[A-Z]/;
  const isValid = pattern.test(idString);
  if (isValid) await badRequestParamsError();
  return parseInt(idString);
};

export async function isTitleValid(title: string, userId: number, repository: Repository) {
  const result = await repository.getByTitleAndId(title, userId);
  if (result) await conflictTitleError();
};

//ERROR UTILS
export async function errorTypes(type: Type, message: string) {
  throw { type, message };
}

export async function conflictTitleError() {
  await errorTypes("conflict", "Title already registered");
};

export async function unauthorizedElementError() {
  await errorTypes("unauthorized", "This Element Doesn't Exist or You're not Authorized to Access");
};

export async function unauthorizedAuthError() {
  await errorTypes("unauthorized", "This email/password is invalid");
};

export async function badRequestParamsError() {
  await errorTypes("bad_request", "Invalid Params");
};