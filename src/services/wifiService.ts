import { CreateWifiData } from "../controllers/wifiController.js";
import * as wifiRepository from "../repositories/wifiRepository.js";
import * as utils from "../utils/utils.js";

export async function createWifi(wifiData: CreateWifiData) {
  const { password } = wifiData;

  const passwordHash = await utils.encryptElement(password);

  await wifiRepository.create({ ...wifiData, password: passwordHash });
};

export async function getAllWifi(userId: number) {
  const wifi = await wifiRepository.getAll(userId);
  const wifiDecrypted = await utils.decryptPasswordMap(wifi);

  return wifiDecrypted;
};

export async function getWifiById(userId: number, idString: string) {
  const wifiId = await utils.isParamsValid(idString);
  const wifi = await utils.getRepositoryById(userId, wifiId, wifiRepository);
  const wifiDecrypted = await utils.decryptPassword(wifi);

  return wifiDecrypted;
};

export async function deleteWifiById(userId: number, idString: string) {
  const secureNoteId = await utils.isParamsValid(idString);
  await utils.getRepositoryById(userId, secureNoteId, wifiRepository)
  await wifiRepository.deleteById(secureNoteId);
};