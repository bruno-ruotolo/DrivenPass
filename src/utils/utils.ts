import { Type } from "../middlewares/handleErrorMiddleware.js"


export async function errorTypes(type: Type, message: string) {
  throw { type, message };
};
