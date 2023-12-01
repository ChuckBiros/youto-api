const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3032;

// Importez votre fichier de documentation Swagger
const swaggerSpec = require("./swagger");

// Middleware pour Swagger UI
const swaggerUi = require("swagger-ui-express");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importez les contrôleurs
const loginController = require("./controllers/login/loginController");
const categorieController = require("./controllers/ap-categorie/apCategorieController");
const procedureController = require("./controllers/administrative-procedure/administrationProcedureController");
const articleController = require("./controllers/article/articleController");
const articleImageController = require("./controllers/article-image/articleImageController");

// Middleware pour le traitement des requêtes JSON
app.use(express.json());

// Routes de l'API pour l'authentification
app.post("/login", loginController.login);

// Routes de l'API associées aux contrôleurs
app.get(
  "/ap-categories",
  authenticateToken,
  categorieController.getAllCategories
);
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

// Routes de l'API associées au contrôleur des images d'articles
app.get("/image-article", articleImageController.getAllImages);
app.get("/image-article/:id", articleImageController.getImageById);
app.post("/image-article", articleImageController.addImage);
app.put("/image-article/:id", articleImageController.updateImage);
app.delete("/image-article/:id", articleImageController.deleteImage);

// Si vous avez d'autres contrôleurs, associez-les ici de la même manière

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}
