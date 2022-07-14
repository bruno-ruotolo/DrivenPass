import prisma from "../config/db.js";

import { CreateCredentialsData } from "../controllers/credentialsController.js";

export async function create(credentialsData: CreateCredentialsData) {
  await prisma.credentials.create({ data: credentialsData });
};