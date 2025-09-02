class BaseHTTPError extends Error {
  public status: number = 400;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default BaseHTTPError;
