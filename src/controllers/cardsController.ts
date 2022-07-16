import { Cards } from "@prisma/client";
import { Request, Response } from "express";

import * as cardsService from "../services/cardsService.js";

export type CreateCardData = Omit<Cards, "id" | "createAte">;
interface Id { id: number; };

export async function createCards(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const cardsData: CreateCardData = { userId, ...req.body };

  await cardsService.createCards(cardsData);

  res.sendStatus(201);
};

export async function getAllCards(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;

  const cards = await cardsService.getAllCards(userId);

  res.status(200).send(cards);
};

export async function getCardsById(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const { id: cardIdString } = req.params;

  const cards = await cardsService.getCardsById(userId, cardIdString);

  res.status(200).send(cards);
};

export async function deleteCardsById(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const { id: credentialIdString } = req.params;

  await cardsService.deleteCardsById(userId, credentialIdString);

  res.sendStatus(200);
};