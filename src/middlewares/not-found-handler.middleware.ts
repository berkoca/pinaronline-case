import { Request, Response } from "express";

function notFoundHandler(request: Request, response: Response) {
  return response.status(404).json({
    message: "This route doesn't exist.",
  });
}

export default notFoundHandler;
