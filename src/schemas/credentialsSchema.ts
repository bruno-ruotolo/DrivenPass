import Joi from "joi";

export const credentialsSchema = Joi.object({
  title: Joi.string().max(50).required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
});