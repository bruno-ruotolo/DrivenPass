import { Wifi } from "@prisma/client";
import { Request, Response } from "express";

import * as wifiService from "../services/wifiService.js"

export type CreateWifiData = Omit<Wifi, "id" | "createdAt">;
interface Id { id: number; };

export async function createWifi(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const wifiData: CreateWifiData = { userId, ...req.body };

  await wifiService.createWifi(wifiData);

  res.sendStatus(201);
};

export async function getAllWifi(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;

  const wifi = await wifiService.getAllWifi(userId);

  res.status(200).send(wifi);
};

export async function getWifiById(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const { id: wifiIdString } = req.params;

  const wifi = await wifiService.getWifiById(userId, wifiIdString);

  res.status(200).send(wifi);
};

export async function deleteWifiById(req: Request, res: Response) {
  const { id: userId }: Id = res.locals.token;
  const { id: wifiIdString } = req.params;

  await wifiService.deleteWifiById(userId, wifiIdString);

  res.sendStatus(200);
};