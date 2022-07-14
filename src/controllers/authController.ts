import { Request, Response } from "express"

import * as authService from "../services/authService.js"

export async function register(req: Request, res: Response) {
  const userData: authService.CreateUserData = req.body;

  await authService.register(userData);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const userData: authService.CreateUserData = req.body;

  const token = await authService.login(userData);
  res.status(200).send(token);
};