const db = require("../../config/database").promise(); // Importez la configuration de votre base de données

/**
 * @swagger
 * tags:
 *   name: Appointement Tracking
 *   description: Opérations sur le suivi des rendez-vous
 */

/**
 * @swagger
 * /appointement-tracking:
 *   get:
 *     summary: Récupérer tous les suivis de rendez-vous
 *     tags: [Appointement Tracking]
 *     responses:
 *       200:
 *         description: Liste de tous les suivis de rendez-vous
 */
exports.getAllAppointementTracking = async (req, res) => {
  try {
    const appointements = await db.query("SELECT * FROM APPOINTEMENT_TRACKING");
    res.json(appointements[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des suivis de rendez-vous.",
    });
  }
};

/**
 * @swagger
 * /appointement-tracking/{id}:
 *   get:
 *     summary: Récupérer un suivi de rendez-vous par ID
 *     tags: [Appointement Tracking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du suivi de rendez-vous à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du suivi de rendez-vous
 *       404:
 *         description: Suivi de rendez-vous non trouvé
 */
exports.getAppointementTrackingById = async (req, res) => {
  const appointementId = req.params.id;
  try {
    const [appointement] = await db.query(
      "SELECT * FROM APPOINTEMENT_TRACKING WHERE ID = ?",
      [appointementId]
    );
    if (appointement.length === 0) {
      return res
        .status(404)
        .json({ error: "Suivi de rendez-vous non trouvé." });
    }
    res.json(appointement[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération du suivi de rendez-vous.",
    });
  }
};

/**
 * @swagger
 * /appointement-tracking:
 *   post:
 *     summary: Ajouter un nouveau suivi de rendez-vous
 *     tags: [Appointement Tracking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_APPOINTEMENT:
 *                 type: integer
 *               ID_USER:
 *                 type: integer
 *               START_DATETIME:
 *                 type: string
 *                 format: date-time
 *               END_DATETIME:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - ID_APPOINTEMENT
 *               - ID_USER
 *               - START_DATETIME
 *               - END_DATETIME
 *     responses:
 *       201:
 *         description: Suivi de rendez-vous ajouté avec succès
 */
exports.addAppointementTracking = async (req, res) => {
  const { ID_APPOINTEMENT, ID_USER, START_DATETIME, END_DATETIME } = req.body;
  try {
    await db.query(
      "INSERT INTO APPOINTEMENT_TRACKING (ID_APPOINTEMENT, ID_USER, START_DATETIME, END_DATETIME) VALUES (?, ?, ?, ?)",
      [ID_APPOINTEMENT, ID_USER, START_DATETIME, END_DATETIME]
    );
    res.status(201).json({
      message: "Suivi de rendez-vous ajouté avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de l'ajout du suivi de rendez-vous.",
    });
  }
};

/**
 * @swagger
 * /appointement-tracking/{id}:
 *   put:
 *     summary: Mettre à jour un suivi de rendez-vous par ID
 *     tags: [Appointement Tracking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du suivi de rendez-vous à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_APPOINTEMENT:
 *                 type: integer
 *               ID_USER:
 *                 type: integer
 *               START_DATETIME:
 *                 type: string
 *                 format: date-time
 *               END_DATETIME:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - ID_APPOINTEMENT
 *               - ID_USER
 *               - START_DATETIME
 *               - END_DATETIME
 *     responses:
 *       200:
 *         description: Suivi de rendez-vous mis à jour avec succès
 */
exports.updateAppointementTracking = async (req, res) => {
  const appointementId = req.params.id;
  const { ID_APPOINTEMENT, ID_USER, START_DATETIME, END_DATETIME } = req.body;
  try {
    await db.query(
      "UPDATE APPOINTEMENT_TRACKING SET ID_APPOINTEMENT = ?, ID_USER = ?, START_DATETIME = ?, END_DATETIME = ? WHERE ID = ?",
      [ID_APPOINTEMENT, ID_USER, START_DATETIME, END_DATETIME, appointementId]
    );
    res.json({
      message: "Suivi de rendez-vous mis à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour du suivi de rendez-vous.",
    });
  }
};

/**
 * @swagger
 * /appointement-tracking/{id}:
 *   delete:
 *     summary: Supprimer un suivi de rendez-vous par ID
 *     tags: [Appointement Tracking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du suivi de rendez-vous à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Suivi de rendez-vous supprimé avec succès
 */
exports.deleteAppointementTracking = async (req, res) => {
  const appointementId = req.params.id;
  try {
    await db.query("DELETE FROM APPOINTEMENT_TRACKING WHERE ID = ?", [
      appointementId,
    ]);
    res.json({
      message: "Suivi de rendez-vous supprimé avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression du suivi de rendez-vous.",
    });
  }
};
