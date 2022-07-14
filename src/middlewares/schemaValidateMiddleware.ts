import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function schemaValidate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body;
    const { error } = schema.validate(reqBody);
    if (error) return res.status(422).send(error.details.map(detail => detail.message));
    next();
  };
};