import { Wifi } from "@prisma/client";
import Cryptr from "cryptr";

import { CreateWifiData } from "../controllers/wifiController.js";
import * as wifiRepository from "../repositories/wifiRepository.js";
import * as utils from "../utils/utils.js";

//SERVICES
export async function createWifi(wifiData: CreateWifiData) {
  const { password } = wifiData;

  const passwordHash = await encryptPassword(password);

  await wifiRepository.create({ ...wifiData, password: passwordHash });

};

export async function getAllWifi(userId: number) {
  const wifi = await wifiRepository.getAll(userId);
  const wifiDecrypted = await decryptPasswordMap(wifi);


  return wifiDecrypted;
};

export async function getWifiById(userId: number, idString: string) {
  const wifiId = await utils.isParamsValid(idString);
  const wifi = await getWifi(userId, wifiId);
  const wifiDecrypted = await decryptPassword(wifi);

  return wifiDecrypted;
};

export async function deleteWifiById(userId: number, idString: string) {
  const secureNoteId = await utils.isParamsValid(idString);
  await getWifi(userId, secureNoteId)
  await wifiRepository.deleteById(secureNoteId);
};

//AUXILIARY FUNCTIONS
async function getWifi(userId: number, id: number) {
  const result = await wifiRepository.getById(userId, id);
  if (!result) await utils.errorTypes(
    "unauthorized",
    "This Element Doesn't Exist or You're not Authorized to Access"
  );
  return result;
};

async function encryptPassword(password: string) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const encryptPassword = cryptr.encrypt(password);
  return encryptPassword;
};

async function decryptPasswordMap(elements: Wifi[]) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const elementDecrypted = elements.map(element => {
    const decryptPassword = cryptr.decrypt(element.password);
    return { ...element, password: decryptPassword };
  });

  return elementDecrypted;
};

async function decryptPassword(element: Wifi) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Cryptr(CRYPTR_SECRET_KEY);

  const decryptPassword = cryptr.decrypt(element.password);
  const elementDecrypted = { ...element, password: decryptPassword };

  return elementDecrypted;
};
