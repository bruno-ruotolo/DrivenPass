import { Router } from "express";

import { createCards, deleteCardsById, getAllCards, getCardsById } from "../controllers/cardsController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import { cardsSchema } from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards", authTokenMiddleware, schemaValidate(cardsSchema), createCards);
cardsRouter.get("/cards", authTokenMiddleware, getAllCards);
cardsRouter.get("/cards/:id", authTokenMiddleware, getCardsById);
cardsRouter.delete("/cards/:id", authTokenMiddleware, deleteCardsById);

export default cardsRouter;