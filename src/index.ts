import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

import router from "./routers/index.js";
import handleError from "./middlewares/handleErrorMiddleware.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(handleError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server Up on Port: ${PORT}`));
});