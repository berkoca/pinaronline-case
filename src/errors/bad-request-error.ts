import BaseHTTPError from "./base-http-error";

class BadRequestError extends BaseHTTPError {
  constructor(message: string) {
    super(400, message);
  }
}

export default BadRequestError;
