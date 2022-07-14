import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";

import * as utils from "../utils/utils.js"

interface UserTokenData {
  email: string;
  id: string;
}

export default async function (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  const data = jwt.verify(token, JWT_SECRET_KEY);

  if (!data) await utils.errorTypes("unauthorized", "Invalid User/User Not Logged In");

  res.locals.token = data;
  next();
};