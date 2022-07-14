import prisma from "../config/db.js";

import { CreateSessionData, CreateUserData } from "../services/authService.js";

export async function register(userData: CreateUserData) {
  await prisma.users.create({ data: userData });
};

export async function getUserByEmail(email: string) {
  const result = await prisma.users.findFirst({ where: { email } });
  return result;
};

export async function createSession(sessionData: CreateSessionData) {
  await prisma.sessions.create({ data: sessionData });
};

export async function getSessionByToken(token: string) {
  const result = await prisma.sessions.findFirst({ where: { token } });
  return result;
};