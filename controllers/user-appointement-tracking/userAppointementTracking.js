const db = require("../../config/database").promise(); // Importez la configuration de votre base de données

/**
 * @swagger
 * /user-appointement-tracking/{id}:
 *   get:
 *     summary: Récupérer un suivi de rendez-vous par ID d'utilisateur
 *     tags: [Appointement Tracking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description:  ID de l'utilisateur du suivi de rendez-vous à récupérer de l'abonnement en cours
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du suivi de rendez-vous pour un utilisateur
 *       404:
 *         description: Suivi de rendez-vous non trouvé
 */
exports.getUserAppointementTrackingByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const [appointement] = await db.query(
      "SELECT appointement_tracking.ID_USER, appointement_tracking.START_DATETIME, appointement_tracking.END_DATETIME FROM `appointement_tracking` INNER JOIN user ON user.ID = appointement_tracking.ID_USER INNER JOIN is_subcribed ON user.ID = is_subcribed.ID_USER WHERE (SELECT ID_USER FROM is_subcribed WHERE is_subcribed.ID_USER = ? AND START_DATE <= NOW() AND END_DATE >= NOW());",
      [userId]
    );
    if (appointement.length === 0) {
      return res
        .status(404)
        .json({ error: "Suivi de rendez-vous de l'utilisateur non trouvé." });
    }

    // Traitements supplémentaires sur les rendez-vous récupérés
    appointement.forEach((appointment) => {
      // Par exemple, formater les dates ou effectuer d'autres opérations
      appointment.totalMinutesUsed =
        (appointment.END_DATETIME - appointment.START_DATETIME) / 60000;
    });

    res.json(appointement);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération du suivi de rendez-vous.",
    });
  }
};
