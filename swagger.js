const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Spécifiez la version d'OpenAPI que vous utilisez
    info: {
      title: "API YOUTO",
      version: "1.0.0",
      description: "Description de votre API",
    },
  },
  // Les fichiers avec les annotations Swagger de vos contrôleurs
  apis: ["./controllers/*/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
