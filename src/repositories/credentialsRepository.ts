import prisma from "../config/db.js";

import { CreateCredentialsData } from "../controllers/credentialsController.js";

export async function create(data: CreateCredentialsData) {
  console.log(data)
  await prisma.credentials.create({ data });
};

export async function getByTitleAndId(title: string, userId: number) {
  return await prisma.credentials.findFirst({
    where: { userId, title: { contains: title, mode: 'insensitive' } }
  });
};

export async function getAll(userId: number) {
  return await prisma.credentials.findMany({ where: { userId } });
};

export async function getById(userId: number, id: number) {
  return await prisma.credentials.findFirst({ where: { userId, id } });
};

export async function deleteById(id: number) {
  return await prisma.credentials.delete({ where: { id } });
};

