import prisma from "../config/db.js";

import { CreateSessionData, CreateUserData } from "../controllers/authController.js";

export async function register(userData: CreateUserData) {
  await prisma.users.create({ data: userData });
};

export async function getUserByEmail(email: string) {
  return await prisma.users.findFirst({ where: { email } });
};

export async function createSession(sessionData: CreateSessionData) {
  await prisma.sessions.create({ data: sessionData });
};

export async function getSessionByToken(token: string) {
  return await prisma.sessions.findFirst({ where: { token } });
}