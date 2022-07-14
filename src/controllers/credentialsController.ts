import { Credentials } from "@prisma/client"
import { Request, Response } from "express"

export type CreateCredentialsData = Omit<Credentials, "id" | "createdAt">

export async function createCredentials(req: Request, res: Response) {
  const { id: userId } = res.locals.token;
  const credentialsData: CreateCredentialsData = { userId, ...req.body };



  res.sendStatus(200);
};