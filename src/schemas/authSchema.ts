import Joi from "joi";

import { CreateUserData } from "../controllers/authController.js";

export const authSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required()
});