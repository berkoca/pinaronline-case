import express from "express";
import swaggerUi from "swagger-ui-express";
import errorHandler from "./middlewares/error-handler.middleware";
import notFoundHandler from "./middlewares/not-found-handler.middleware";
import rateLimiter from "./middlewares/rate-limiter.middleware";
import router from "./routes";
import swaggerSpec from "./utils/swagger";

// App
const app = express();

// Config
app.use(express.json());

// Routes
app.use("/api/v1", rateLimiter, router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
