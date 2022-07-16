import prisma from "../config/db.js";

import { CreateWifiData } from "../controllers/wifiController.js";

export async function create(data: CreateWifiData) {

  await prisma.wifi.create({ data });
};

export async function getByTitleAndId(title: string, userId: number) {
  return prisma.wifi.findFirst({ where: { userId, title } });
};

export async function getAll(userId: number) {
  return prisma.wifi.findMany({ where: { userId } })
};

export async function getById(userId: number, id: number) {
  return prisma.wifi.findFirst({ where: { userId, id } });
};

export async function deleteById(id: number) {
  return prisma.wifi.delete({ where: { id } });
};

