import Joi from "joi";

import { CreateSecureNotesData } from "../controllers/secureNoteController.js";

export const secureNoteSchema = Joi.object<CreateSecureNotesData>({
  title: Joi.string().max(50).required(),
  note: Joi.string().max(1000).required()
});