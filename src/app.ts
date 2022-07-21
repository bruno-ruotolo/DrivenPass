import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

import router from "./routers/index.js";
import handleError from "./middlewares/handleErrorMiddleware.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(handleError);

export default app;
