const db = require("../../config/database").promise(); // Importez la configuration de votre base de données

/**
 * @swagger
 * tags:
 *   name: Démarches administratives
 *   description: Opérations liées aux démarches administratives
 */

/**
 * @swagger
 * /procedure:
 *   get:
 *     summary: Récupérer toutes les démarches administratives
 *     tags: [Démarches administratives]
 *     responses:
 *       200:
 *         description: Liste de toutes les démarches administratives
 */
exports.getAllProcedures = async (req, res) => {
  try {
    const demarches = await db.query("SELECT * FROM administrative_procedure");
    res.json(demarches[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des démarches administratives.",
    });
  }
};

/**
 * @swagger
 * /procedure/{id}:
 *   get:
 *     summary: Récupérer une démarche administrative par ID
 *     tags: [Démarches administratives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la démarche administrative à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la démarche administrative
 *       404:
 *         description: Démarche administrative non trouvée
 */
exports.getProcedureById = async (req, res) => {
  const demarcheId = req.params.id;
  try {
    const demarche = await db.query(
      "SELECT * FROM administrative_procedure WHERE id = ?",
      [demarcheId]
    );
    if (demarche.length === 0) {
      return res
        .status(404)
        .json({ error: "Démarche administrative non trouvée." });
    }
    res.json(demarche[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération de la démarche administrative.",
    });
  }
};

/**
 * @swagger
 * /procedure:
 *   post:
 *     summary: Créer une nouvelle démarche administrative
 *     tags: [Démarches administratives]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Démarche administrative créée avec succès
 */
exports.createProcedure = async (req, res) => {
  const { nom, description } = req.body;
  try {
    await db.query(
      "INSERT INTO administrative_procedure (nom, description) VALUES (?, ?)",
      [nom, description]
    );
    res.json({
      message: "Démarche administrative créée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la création de la démarche administrative.",
    });
  }
};

/**
 * @swagger
 * /procedure/{id}:
 *   put:
 *     summary: Mettre à jour une démarche administrative par ID
 *     tags: [Démarches administratives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la démarche administrative à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Démarche administrative mise à jour avec succès
 */
exports.updateProcedure = async (req, res) => {
  const demarcheId = req.params.id;
  const { nom, description } = req.body;
  try {
    await db.query(
      "UPDATE administrative_procedure SET nom = ?, description = ? WHERE id = ?",
      [nom, description, demarcheId]
    );
    res.json({
      message: "Démarche administrative mise à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de la démarche administrative.",
    });
  }
};

/**
 * @swagger
 * /procedure/{id}:
 *   delete:
 *     summary: Supprime une démarche administrative par ID
 *     tags: [Démarches administratives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la démarche administrative à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Démarche administrative supprimée avec succès
 */
exports.deleteProcedure = async (req, res) => {
  const demarcheId = req.params.id;
  try {
    await db.query("DELETE FROM administrative_procedure WHERE id = ?", [
      demarcheId,
    ]);
    res.json({
      message: "Démarche administrative supprimée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression de la démarche administrative.",
    });
  }
};
