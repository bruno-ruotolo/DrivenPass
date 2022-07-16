import Joi from "joi";

import { CreateWifiData } from "../controllers/wifiController.js";

export const wifiSchema = Joi.object<CreateWifiData>({
  title: Joi.string().max(50).required(),
  name: Joi.string().max(1000).required(),
  password: Joi.string().required()
});