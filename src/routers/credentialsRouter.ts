import { Router } from "express";

import { createCredentials } from "../controllers/credentialsController.js";
import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import { credentialsSchema } from "../schemas/credentialsSchema.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", schemaValidate(credentialsSchema), authTokenMiddleware, createCredentials);

export default credentialsRouter;