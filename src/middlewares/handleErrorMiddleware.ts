import { NextFunction, Request, Response } from "express";

interface AppError {
  type: "not_found" | "bad_request" | "unauthorized" | "conflict";
  message: string;
};

const ERRORS = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400
};

export default function handleError(error: AppError, req: Request, res: Response, next: NextFunction) {
  const type = error.type;
  let statusCode = ERRORS[type] || 500;
  res.status(statusCode).send(error.message || "");
};