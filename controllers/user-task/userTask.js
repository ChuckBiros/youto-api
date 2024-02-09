const db = require("../../config/database").promise(); // Importez la configuration de votre base de données

/**
 * @swagger
 * /user-task/{id}:
 *   get:
 *     summary: Récupérer les tâches non terminé par ID d'utilisateur
 *     tags: [Liste de tâches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description:  ID de l'utilisateur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des tâches pour un utilisateur
 *       404:
 *         description: Liste des tâches
 */
exports.getUserTasksByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const [appointement] = await db.query(
      "SELECT * FROM todo_list INNER JOIN user ON user.ID = todo_list.ID_USER WHERE user.ID = ? AND todo_list.STATUS != 'Done';",
      [userId]
    );
    if (appointement.length === 0) {
      return res
        .status(404)
        .json({ error: "Suivi de rendez-vous de l'utilisateur non trouvé." });
    }

    res.json(appointement);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération du suivi de rendez-vous.",
    });
  }
};
