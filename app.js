const express = require("express");
const app = express();
const port = process.env.PORT || 3032;

// Importez votre fichier de documentation Swagger
const swaggerSpec = require("./swagger");

// Middleware pour Swagger UI
const swaggerUi = require("swagger-ui-express");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importez les contrôleurs
const categorieController = require("./controllers/ap-categorie/apCategorieController");
const procedureController = require("./controllers/administrative-procedure/administrationProcedureController");
const articleController = require("./controllers/article/articleController");

// Middleware pour le traitement des requêtes JSON
app.use(express.json());

// Routes de l'API associées aux contrôleurs
app.get("/ap-categories", categorieController.getAllCategories);
app.get("/ap-categories/:id", categorieController.getCategoryById);
app.post("/ap-categories", categorieController.createCategory);
app.put("/ap-categories/:id", categorieController.updateCategory);
app.delete("/ap-categories/:id", categorieController.deleteCategory);

// Routes de l'API associées au contrôleur des démarches administratives
app.get("/procedure", procedureController.getAllProcedures);
app.get("/procedure/:id", procedureController.getProcedureById);
app.post("/procedure", procedureController.createProcedure);
app.put("/procedure/:id", procedureController.updateProcedure);
app.delete("/procedure/:id", procedureController.deleteProcedure);

// Routes de l'API associées au contrôleur des articles
app.get("/articles", articleController.getAllArticles);
app.get("/articles/:id", articleController.getArticleById);
app.post("/articles", articleController.createArticle);
app.put("/articles/:id", articleController.updateArticle);
app.delete("/articles/:id", articleController.deleteArticle);

// Si vous avez d'autres contrôleurs, associez-les ici de la même manière

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
