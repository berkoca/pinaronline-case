import { NextFunction, Request, Response } from "express";
import BaseHTTPError from "../errors/base-http-error";

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof BaseHTTPError) {
    return response.status(error.status).json({
      message: error.message,
    });
  } else {
    console.error(`Error: ` + error?.message);

    return response.status(500).json({
      message: "A server error occured.",
    });
  }
}

export default errorHandler;
