import Joi from "joi";

import { CreateCardData } from "../controllers/cardsController.js";

export const cardsSchema = Joi.object<CreateCardData>({
  title: Joi.string().max(50).required(),
  number: Joi.string().min(8).max(19).required(),
  name: Joi.string().required(),
  cvv: Joi.string().min(3).max(4).required(),
  expirationDate: Joi.string().regex(/^\d{2}\/\d{2}$/),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("credit", "debit", "both").required()
});