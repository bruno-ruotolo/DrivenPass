import { Router } from "express";

import authTokenMiddleware from "../middlewares/authTokenMiddleware.js";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware.js";
import { secureNoteSchema } from "../schemas/secureNotesSchema.js";
import {
  createSecureNotes, deleteSecureNotesById, getAllSecureNotes, getSecureNotesById
} from "../controllers/secureNoteController.js";

const secureNotesRouter = Router();

secureNotesRouter.post("/secure-notes", authTokenMiddleware, schemaValidate(secureNoteSchema), createSecureNotes);
secureNotesRouter.get("/secure-notes", authTokenMiddleware, getAllSecureNotes);
secureNotesRouter.get("/secure-notes/:id", authTokenMiddleware, getSecureNotesById);
secureNotesRouter.delete("/secure-notes/:id", authTokenMiddleware, deleteSecureNotesById);

export default secureNotesRouter;