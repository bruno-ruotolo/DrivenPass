import prisma from "../config/db.js";

import { CreateWifiData } from "../controllers/wifiController.js";

export async function create(data: CreateWifiData) {
  await prisma.wifi.create({ data });
};

export async function getAll(userId: number) {
  return await prisma.wifi.findMany({ where: { userId } })
};

export async function getById(userId: number, id: number) {
  return await prisma.wifi.findFirst({ where: { userId, id } });
};

export async function deleteById(id: number) {
  return await prisma.wifi.delete({ where: { id } });
};

