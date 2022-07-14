import { Credentials } from "@prisma/client";
import { Request, Response } from "express";

import * as credentialsService from "../services/credentialsService.js";

export type CreateCredentialsData = Omit<Credentials, "id" | "createdAt">;
interface Id { id: number; };

export async function createCredentials(req: Request, res: Response) {
  const { id: userId }: { id: string } = res.locals.token;
  const credentialsData: CreateCredentialsData = { userId, ...req.body };

  await credentialsService.createCredentials(credentialsData);

  res.sendStatus(201);
};

export async function getAllCredentials(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;

  const credentials = await credentialsService.getAllCredentials(userId);

  res.status(200).send(credentials);
};

export async function getCredentialsById(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const { id: credentialIdString } = req.params;

  const credentials = await credentialsService.getCredentialsById(userId, credentialIdString);

  res.status(200).send(credentials);
};