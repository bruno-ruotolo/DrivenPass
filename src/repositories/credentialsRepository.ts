import prisma from "../config/db.js";

import { CreateCredentialsData } from "../controllers/credentialsController.js";

export async function createCredentials(credentialsData: CreateCredentialsData) {
  await prisma.credentials.create({ data: credentialsData });
};

export async function getCredentialsByTitleAndId(title: string, userId: number) {
  return await prisma.credentials.findFirst({ where: { userId, title } });
};

export async function getAllCredentials(userId: number) {
  return await prisma.credentials.findMany({ where: { userId } });
};

export async function getCredentialsById(userId: number, credentialId: number) {
  return await prisma.credentials.findFirst({ where: { userId, id: credentialId } });
};

