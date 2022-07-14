import { Router } from "express";

import { register, login } from "../controllers/authController.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidate(authSchema), register);
authRouter.post("/", schemaValidate(authSchema), login);

export default authRouter;