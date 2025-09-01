import { NextFunction, Request, Response } from "express";
import Joi from "joi";

function validate(schema: Joi.Schema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { error, value } = schema.validate(request.body || {}, {
      abortEarly: false,
    });

    // If request body does not match with route's schema then throw error
    if (error) {
      return response.status(400).json({
        message: `${error.details.map((e) => e.message + ", ")}.`,
      });
    }

    // Replace request body with sanitized values
    request.body = value;

    // Continue to the route
    next();
  };
}

export default validate;
