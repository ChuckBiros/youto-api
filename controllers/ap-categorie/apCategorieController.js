const db = require("../../config/database"); // Importez la configuration de votre base de données

/**
 * @swagger
 * tags:
 *   name: Administrative procedures catégories
 *   description: Opérations sur les catégories de démarches administratives
 */

/**
 * @swagger
 * /ap-categories:
 *   get:
 *     summary: Récupère toutes les catégories de démarches administratives
 *     tags: [Administrative procedures catégories]
 *     responses:
 *       200:
 *         description: Liste de toutes les catégories de démarche administrative
 */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.query("SELECT * FROM ap_categories");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Erreur lors de la récupération des catégories de démarche administrative.",
    });
  }
};

/**
 * @swagger
 * /ap-categories/{id}:
 *   get:
 *     summary: Récupère une catégorie de démarche administrative par ID
 *     tags: [Administrative procedures catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie de démarche administrative à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la catégorie de démarche administrative de démarche administrative
 *       404:
 *         description: Catégorie non trouvée
 */
exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await db.query(
      "SELECT * FROM ap_categories WHERE id = ?",
      [categoryId]
    );
    if (category.length === 0) {
      return res
        .status(404)
        .json({ error: "Catégorie de démarche administrative non trouvée." });
    }
    res.json(category[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Erreur lors de la récupération de la catégorie de démarche administrative.",
    });
  }
};

/**
 * @swagger
 * /ap-categories:
 *   post:
 *     summary: Crée une nouvelle catégorie de démarche administrative
 *     tags: [Administrative procedures catégories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catégorie de démarche administrative créée avec succès
 */
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await db.query(
      "INSERT INTO ap_categories (name, description) VALUES (?, ?)",
      [name, description]
    );
    res.json({
      message: "Catégorie de démarche administrative créée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Erreur lors de la création de la catégorie de démarche administrative.",
    });
  }
};

/**
 * @swagger
 * /ap-categories/{id}:
 *   put:
 *     summary: Met à jour une catégorie de démarche administrative par ID
 *     tags: [Administrative procedures catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie de démarche administrative à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catégorie de démarche administrative mise à jour avec succès
 */
exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;
  try {
    await db.query(
      "UPDATE ap_categories SET name = ?, description = ? WHERE id = ?",
      [name, description, categoryId]
    );
    res.json({
      message: "Catégorie de démarche administrative mise à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Erreur lors de la mise à jour de la catégorie de démarche administrative.",
    });
  }
};

/**
 * @swagger
 * /ap-categories/{id}:
 *   delete:
 *     summary: Supprime une catégorie de démarche administrative par ID
 *     tags: [Administrative procedures catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie de démarche administrative à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie de démarche administrative supprimée avec succès
 */
exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await db.query("DELETE FROM ap_categories WHERE id = ?", [categoryId]);
    res.json({
      message: "Catégorie de démarche administrative supprimée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Erreur lors de la suppression de la catégorie de démarche administrative.",
    });
  }
};
