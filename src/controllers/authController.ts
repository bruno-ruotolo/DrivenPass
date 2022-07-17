import { Sessions, Users } from "@prisma/client";
import { Request, Response } from "express"

import * as authService from "../services/authService.js"

export type CreateUserData = Omit<Users, "id" | "createdAt">;
export type CreateSessionData = Omit<Sessions, "id" | "createdAt">;

export async function register(req: Request, res: Response) {
  const userData: CreateUserData = req.body;

  await authService.register(userData);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const userData: CreateUserData = req.body;

  const token = await authService.login(userData);
  res.status(200).send(token);
};