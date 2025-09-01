class BadRequestError extends Error {
  public status: number = 400;

  constructor(message: string) {
    super(message);
  }
}

export default BadRequestError;
