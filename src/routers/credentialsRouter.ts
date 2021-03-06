import { Router } from "express";

import { createCredentials, getAllCredentials, getCredentialsById, deleteCredentialsById } from "../controllers/credentialsController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import { credentialsSchema } from "../schemas/credentialsSchema.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", schemaValidate(credentialsSchema), authTokenMiddleware, createCredentials);
credentialsRouter.get("/credentials", authTokenMiddleware, getAllCredentials);
credentialsRouter.get("/credentials/:id", authTokenMiddleware, getCredentialsById);
credentialsRouter.delete("/credentials/:id", authTokenMiddleware, deleteCredentialsById);

export default credentialsRouter;