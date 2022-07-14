import { Router } from "express";

import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import { secureNoteSchema } from "../schemas/secureNotesSchema.js";
import { createSecureNotes } from "../controllers/secureNoteController.js";

const secureNotesRouter = Router();

secureNotesRouter.post("/secure-notes", authTokenMiddleware, schemaValidate(secureNoteSchema), createSecureNotes);

export default secureNotesRouter;