const db = require("../../config/database").promise(); // Import de la configuration de la base de données

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Opérations liées à la gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Liste de tous les utilisateurs
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM user");
    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des utilisateurs.",
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 */
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await db.query("SELECT * FROM user WHERE id = ?", [userId]);
    if (user.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    res.json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération de l'utilisateur.",
    });
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               tel_number:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date-time
 *               inscription_date:
 *                 type: string
 *                 format: date-time
 *               password:
 *                 type: string
 *               id_role:
 *                 type: integer
 *               city:
 *                 type: string
 *             required:
 *               - email
 *               - first_name
 *               - last_name
 *               - password
 *               - id_role
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
exports.createUser = async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    tel_number,
    birth_date,
    inscription_date,
    password,
    id_role = 1,
    city,
  } = req.body;
  try {
    await db.query(
      "INSERT INTO user (email, first_name, last_name, tel_number, birth_date, inscription_date, password, id_role, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        email,
        first_name,
        last_name,
        tel_number,
        birth_date,
        inscription_date,
        password,
        id_role,
        city,
      ]
    );
    res.json({
      message: "Utilisateur créé avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la création de l'utilisateur.",
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               tel_number:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               inscription_date:
 *                 type: string
 *               id_role:
 *                 type: integer
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 */
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const {
    email,
    first_name,
    last_name,
    tel_number,
    birth_date,
    inscription_date,
    password,
    id_role,
    city,
  } = req.body;
  try {
    await db.query(
      "UPDATE user SET email = ?, first_name = ?, last_name = ?, tel_number = ?, birth_date = ?, inscription_date = ?, id_role = ?, city = ? WHERE id = ?",
      [
        email,
        first_name,
        last_name,
        tel_number,
        birth_date,
        inscription_date,
        id_role,
        city,
        userId,
      ]
    );
    res.json({
      message: "Utilisateur mis à jour avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l'utilisateur.",
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 */
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await db.query("DELETE FROM user WHERE id = ?", [userId]);
    res.json({
      message: "Utilisateur supprimé avec succès.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression de l'utilisateur.",
    });
  }
};
