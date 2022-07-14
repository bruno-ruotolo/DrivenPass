import { Router } from "express";

import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import secureNotesRouter from "./secureNotesRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(secureNotesRouter);

export default router;