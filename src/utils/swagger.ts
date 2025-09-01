import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Pinaronline Case Study",
    version: "1.0.0",
    description:
      "API Documentation of Pinaronline Case Study made by Berk Koca",
  },
  servers: [
    {
      url: "https://pinaronline-api.berkoca.com/api/v1",
      description: "Production Server",
    },
    {
      url: "http://localhost:3000/api/v1",
      description: "Local Test Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
