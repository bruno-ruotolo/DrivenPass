import prisma from "../config/db.js";

import { CreateCredentialsData } from "../controllers/credentialsController.js";

export async function create(credentialsData: CreateCredentialsData) {
  await prisma.credentials.create({ data: credentialsData });
};

export async function getCredentialsByTitleAndId(title: string, userId: number) {
  return await prisma.credentials.findFirst({ where: { userId, title } });
};

export async function getAll(userId: number) {
  return await prisma.credentials.findMany({ where: { userId } });
};