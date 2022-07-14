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

  await credentialsRepository.createCredentials({ ...credentialsData, password: passwordHash });
};

export async function getAllCredentials(userId: number) {
  const credentials = await credentialsRepository.getAllCredentials(userId);
  const credentialsDecrypted = await decryptPasswordMap(credentials);

  return credentialsDecrypted;
};

export async function getCredentialsById(userId: number, credentialIdString: string) {
  const credentialId = await isParamsValid(credentialIdString);
  const credentials = await credentialsRepository.getCredentialsById(userId, credentialId);
  if (!credentials) await utils.errorTypes(
    "unauthorized",
    "This Credential Doesn't Exist or You're not Authorized to Access"
  );

  const credentialsDecrypted = await decryptPassword(credentials);

  return credentialsDecrypted;
};

//AUXILIARY FUNCTIONS
async function isParamsValid(credentialIdString: string) {
  const pattern = /[a-z]|[A-Z]/;
  const isValid = pattern.test(credentialIdString);
  if (isValid) await utils.errorTypes("bad_request", "Invalid Params");
  return parseInt(credentialIdString);
};

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

async function decryptPasswordMap(credentials: Credentials[]) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const credentialsDecrypted = credentials.map(credential => {
    const decryptPassword = cryptr.decrypt(credential.password);
    return { ...credential, password: decryptPassword };
  });

  return credentialsDecrypted;
};

async function decryptPassword(credentials: Credentials) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const decryptPassword = cryptr.decrypt(credentials.password);
  const credentialsDecrypted = { ...credentials, password: decryptPassword };

  return credentialsDecrypted;
};


