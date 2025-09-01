import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import BadRequestError from "./errors/bad-request-error";
import rateLimiter from "./middlewares/rate-limiter.middleware";
import router from "./routes";
import swaggerSpec from "./utils/swagger";

// App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", rateLimiter, router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 & Error Handlers
app.use((request: Request, response: Response) => {
  response.status(404).json({
    message: "This route doesn't exist.",
  });
});

app.use(
  (
    error: Error | BadRequestError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof BadRequestError) {
      return response.status(400).json({
        message: error.message,
      });
    } else {
      console.error(error.message);

      return response.status(500).json({
        message: "A server error occured.",
      });
    }
  }
);

export default app;
