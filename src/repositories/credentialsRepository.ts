import prisma from "../config/db.js";

import { CreateCredentialsData } from "../controllers/credentialsController.js";

export async function create(data: CreateCredentialsData) {
  prisma.credentials.create({ data });
};

export async function getByTitleAndId(title: string, userId: number) {
  return prisma.credentials.findFirst({ where: { userId, title } });
};

export async function getAll(userId: number) {
  return prisma.credentials.findMany({ where: { userId } });
};

export async function getById(userId: number, id: number) {
  return prisma.credentials.findFirst({ where: { userId, id } });
};

export async function deleteById(id: number) {
  return prisma.credentials.delete({ where: { id } });
};

