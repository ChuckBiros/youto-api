const db = require("../../config/database"); // Importez la configuration de votre base de données

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Opérations sur les images
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Récupérer toutes les images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Liste de toutes les images
 */
exports.getAllImages = async (req, res) => {
  try {
    const images = await db.query("SELECT * FROM img");
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des images.",
    });
  }
};

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Récupérer une image par ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'image à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'image
 *       404:
 *         description: Image non trouvée
 */
exports.getImageById = async (req, res) => {
  const imageId = req.params.id;
  try {
    const image = await db.query("SELECT * FROM img WHERE id = ?", [imageId]);
    if (image.length === 0) {
      return res.status(404).json({ error: "Image non trouvée." });
    }
    res.json(image[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération de l'image.",
    });
  }
};

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Ajouter une nouvelle image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: blob
 *               article_id:
 *                 type: int
 *             required:
 *               - name
 *               - image
 *               - article_id
 *     responses:
 *       201:
 *         description: Image ajoutée avec succès
 */
exports.addImage = async (req, res) => {
  const { name, image, article_id } = req.body;
  try {
    await db.query(
      "INSERT INTO img (name, image, article_id) VALUES (?, ?, ?)",
      [name, image, article_id]
    );
    res.json({
      message: "Image ajoutée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de l'ajout de l'image.",
    });
  }
};

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     summary: Mettre à jour une image par ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'image à mettre à jour
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
 *               image:
 *                 type: blob
 *               article_id:
 *                 type: int
 *             required:
 *               - name
 *               - image
 *               - article_id
 *     responses:
 *       200:
 *         description: Image mise à jour avec succès
 */
exports.updateImage = async (req, res) => {
  const imageId = req.params.id;
  const { name, image, article_id } = req.body;
  try {
    await db.query(
      "UPDATE img SET name = ?, image = ?, article_id = ? WHERE id = ?",
      [name, image, article_id, imageId]
    );
    res.json({
      message: "Image mise à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l'image.",
    });
  }
};

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Supprimer une image par ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'image à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image supprimée avec succès
 */
exports.deleteImage = async (req, res) => {
  const imageId = req.params.id;
  try {
    await db.query("DELETE FROM img WHERE id = ?", [imageId]);
    res.json({
      message: "Image supprimée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression de l'image.",
    });
  }
};
