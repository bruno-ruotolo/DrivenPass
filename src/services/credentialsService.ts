import { Credentials, Users } from "@prisma/client";
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
  const credentialsDecrypted = await decryptPassword(credentials);

  return credentialsDecrypted;
};


//AUXILIARY FUNCTIONS
async function isTitleValid(title: string, userId: number) {
  const result = await credentialsRepository.getCredentialsByTitleAndId(title, userId);
  if (result) await utils.errorTypes("conflict", "Title already registered");
};

async function encryptPassword(password: string) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const encryptPassword = cryptr.encrypt(password);
  return encryptPassword;
};

async function decryptPassword(credentials: Credentials[]) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const credentialsDecrypted = credentials.map(credential => {
    const decryptPassword = cryptr.decrypt(credential.password);
    return { ...credential, password: decryptPassword };
  });

  return credentialsDecrypted;
};

