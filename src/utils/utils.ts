export async function errorTypes(type: string, message: string) {
  throw { type, message };
};