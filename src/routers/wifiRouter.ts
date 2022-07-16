import { Router } from "express";

import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import { wifiSchema } from "../schemas/wifiSchema.js";
import {
  createWifi, deleteWifiById, getAllWifi, getWifiById
} from "../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", authTokenMiddleware, schemaValidate(wifiSchema), createWifi);
wifiRouter.get("/wifi", authTokenMiddleware, getAllWifi);
wifiRouter.get("/wifi/:id", authTokenMiddleware, getWifiById);
wifiRouter.delete("/wifi/:id", authTokenMiddleware, deleteWifiById);

export default wifiRouter;