const db = require("../../config/database"); // Importez la configuration de votre base de données

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Opérations sur les articles
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Liste de tous les articles
 */
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await db.query("SELECT * FROM article");
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des articles.",
    });
  }
};

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'article à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'article
 *       404:
 *         description: Article non trouvé
 */
exports.getArticleById = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await db.query("SELECT * FROM article WHERE id = ?", [
      articleId,
    ]);
    if (article.length === 0) {
      return res.status(404).json({ error: "Article non trouvé." });
    }
    res.json(article[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération de l'article.",
    });
  }
};

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Article créé avec succès
 */
exports.createArticle = async (req, res) => {
  const { title, content } = req.body;
  try {
    await db.query("INSERT INTO article (title, content) VALUES (?, ?)", [
      title,
      content,
    ]);
    res.json({
      message: "Article créé avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la création de l'article.",
    });
  }
};

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Mettre à jour un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'article à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 */
exports.updateArticle = async (req, res) => {
  const articleId = req.params.id;
  const { title, content } = req.body;
  try {
    await db.query("UPDATE article SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      articleId,
    ]);
    res.json({
      message: "Article mis à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l'article.",
    });
  }
};

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Supprimer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'article à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 */
exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    await db.query("DELETE FROM article WHERE id = ?", [articleId]);
    res.json({
      message: "Article supprimé avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression de l'article.",
    });
  }
};
