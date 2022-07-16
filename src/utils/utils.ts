import { Type } from "../middlewares/handleErrorMiddleware.js"

export async function errorTypes(type: Type, message: string) {
  throw { type, message };
};

export async function isParamsValid(idString: string) {
  const pattern = /[a-z]|[A-Z]/;
  const isValid = pattern.test(idString);
  if (isValid) await errorTypes("bad_request", "Invalid Params");
  return parseInt(idString);
};
