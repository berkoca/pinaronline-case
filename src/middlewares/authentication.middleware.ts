import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

function authentication(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Missing authorization header.",
    });
  }

  token = token.split(" ")[1];

  verify(
    token,
    process.env.TOKEN_SECRET || "secret",
    (err: any, decoded: any) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      req.user = decoded.user;

      next();
    }
  );
}

export default authentication;
