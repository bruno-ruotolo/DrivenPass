import Joi from "joi";

import { CreateCredentialsData } from "../controllers/credentialsController.js";

export const credentialsSchema = Joi.object<CreateCredentialsData>({
  title: Joi.string().max(50).required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
});