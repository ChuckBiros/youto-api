const db = require("../../config/database").promise();

/**
 * @swagger
 * tags:
 *   name: Liste de tâches
 *   description: Opérations liées à la gestion des tâches
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Récupérer toutes les tâches
 *     tags: [Liste de tâches]
 *     responses:
 *       200:
 *         description: Liste de toutes les tâches
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await db.query("SELECT * FROM todo_list");
    res.json(tasks[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des tâches.",
    });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Récupérer une tâche par ID
 *     tags: [Liste de tâches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tâche à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la tâche
 *       404:
 *         description: Tâche non trouvée
 */
exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await db.query("SELECT * FROM todo_list WHERE id = ?", [
      taskId,
    ]);
    if (task.length === 0) {
      return res.status(404).json({ error: "Tâche non trouvée." });
    }
    res.json(task[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération de la tâche.",
    });
  }
};

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Créer une nouvelle tâche
 *     tags: [Liste de tâches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_description:
 *                 type: string
 *               status:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               id_user:
 *                 type: integer
 *             required:
 *               - task_description
 *               - status
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 */
exports.createTask = async (req, res) => {
  const { task_description, status, deadline, id_user } = req.body;
  try {
    await db.query(
      "INSERT INTO todo_list (task_description, status, deadline, id_user) VALUES (?, ?, ?, ?)",
      [task_description, status, deadline, id_user]
    );
    res.json({
      message: "Tâche créée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la création de la tâche.",
    });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Mettre à jour une tâche par ID
 *     tags: [Liste de tâches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tâche à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_description:
 *                 type: string
 *               status:
 *                 type: string
 *               deadline:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès
 */
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { task_description, status, deadline } = req.body;
  try {
    await db.query(
      "UPDATE todo_list SET task_description = ?, status = ?, deadline = ? WHERE id = ?",
      [task_description, status, deadline, taskId]
    );
    res.json({
      message: "Tâche mise à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de la tâche.",
    });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Supprimer une tâche par ID
 *     tags: [Liste de tâches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tâche à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès
 */
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await db.query("DELETE FROM todo_list WHERE id = ?", [taskId]);
    res.json({
      message: "Tâche supprimée avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression de la tâche.",
    });
  }
};
