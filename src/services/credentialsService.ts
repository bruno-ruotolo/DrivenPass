import { CreateCredentialsData } from "../controllers/credentialsController.js";
import * as credentialsRepository from "../repositories/credentialsRepository.js";
import * as utils from "../utils/utils.js";

export async function createCredentials(credentialsData: CreateCredentialsData) {
  const { title, userId, password } = credentialsData;

  await utils.isTitleValid(title, userId, credentialsRepository);
  const passwordHash = await utils.encryptElement(password);

  await credentialsRepository.create({ ...credentialsData, password: passwordHash });
};

export async function getAllCredentials(userId: number) {
  const credentials = await credentialsRepository.getAll(userId);
  const credentialsDecrypted = await utils.decryptPasswordMap(credentials);

  return credentialsDecrypted;
};

export async function getCredentialsById(userId: number, credentialIdString: string) {
  const credentialId = await utils.isParamsValid(credentialIdString);
  const credentials = await utils.getRepositoryById(userId, credentialId, credentialsRepository);
  const credentialsDecrypted = await utils.decryptPassword(credentials);

  return credentialsDecrypted;
};

export async function deleteCredentialsById(userId: number, credentialIdString: string) {
  const credentialId = await utils.isParamsValid(credentialIdString);
  await utils.getRepositoryById(userId, credentialId, credentialsRepository);
  await credentialsRepository.deleteById(credentialId);
};