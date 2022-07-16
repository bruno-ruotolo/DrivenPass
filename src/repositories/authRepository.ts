import prisma from "../config/db.js";

import { CreateSessionData, CreateUserData } from "../services/authService.js";

export async function register(userData: CreateUserData) {
  prisma.users.create({ data: userData });
};

export async function getUserByEmail(email: string) {
  return prisma.users.findFirst({ where: { email } });
};

export async function createSession(sessionData: CreateSessionData) {
  prisma.sessions.create({ data: sessionData });
};

export async function getSessionByToken(token: string) {
  return prisma.sessions.findFirst({ where: { token } });
}