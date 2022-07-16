import { Credentials } from "@prisma/client";
import Cryptr from "cryptr";

import { CreateCredentialsData } from "../controllers/credentialsController";
import * as credentialsRepository from "../repositories/credentialsRepository.js";
import * as utils from "../utils/utils.js";

//SERVICES
export async function createCredentials(credentialsData: CreateCredentialsData) {
  const { title, userId, password } = credentialsData;

  await isTitleValid(title, userId);
  const passwordHash = await encryptPassword(password);

  await credentialsRepository.create({ ...credentialsData, password: passwordHash });
};

export async function getAllCredentials(userId: number) {
  const credentials = await credentialsRepository.getAll(userId);
  const credentialsDecrypted = await decryptPasswordMap(credentials);

  return credentialsDecrypted;
};

export async function getCredentialsById(userId: number, credentialIdString: string) {
  const credentialId = await utils.isParamsValid(credentialIdString);
  const credentials = await getCredentials(userId, credentialId)
  const credentialsDecrypted = await decryptPassword(credentials);

  return credentialsDecrypted;
};

export async function deleteCredentialsById(userId: number, credentialIdString: string) {
  const credentialId = await utils.isParamsValid(credentialIdString);
  await getCredentials(userId, credentialId)
  await credentialsRepository.deleteById(credentialId);
};

//AUXILIARY FUNCTIONS
async function isTitleValid(title: string, userId: number) {
  const result = await credentialsRepository.getByTitleAndId(title, userId);
  if (result) await utils.errorTypes("conflict", "Title already registered");
};

async function getCredentials(userId: number, credentialId: number) {
  const credentials = await credentialsRepository.getById(userId, credentialId);
  if (!credentials) await utils.errorTypes(
    "unauthorized",
    "This Element Doesn't Exist or You're not Authorized to Access"
  );
  return credentials;
};

async function encryptPassword(password: string) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const encryptPassword = cryptr.encrypt(password);
  return encryptPassword;
};

async function decryptPasswordMap(elements: Credentials[]) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const elementDecrypted = elements.map(element => {
    const decryptPassword = cryptr.decrypt(element.password);
    return { ...element, password: decryptPassword };
  });

  return elementDecrypted;
};

async function decryptPassword(element: Credentials) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const decryptPassword = cryptr.decrypt(element.password);
  const elementDecrypted = { ...element, password: decryptPassword };

  return elementDecrypted;
};


