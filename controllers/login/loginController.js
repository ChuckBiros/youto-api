const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../../config/database").promise(); // Importez la configuration de votre base de données
/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Opération pour récupérer un token d'authentifcation
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: TOKEN
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token found
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [connect] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    JSON.parse(JSON.stringify(connect));
    if (!(connect.length > 0)) {
      return res.status(401).send("invalid credentials (e-mail)");
    }

    if (connect[0].PASSWORD !== password) {
      return res.status(401).send("invalid credentials (password)");
    }

    const accessToken = generateAccessToken(connect[0]);
    res.send({
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération du token d'accès.",
    });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10000s",
  });
}
