const mysql = require("mysql2");

// Configuration de la base de données
const dbConfig = {
  host: "localhost", // Adresse de la base de données
  user: "root", // Nom d'utilisateur de la base de données
  password: "", // Mot de passe de la base de données
  database: "youto", // Nom de la base de données
};

// Créez une connexion à la base de données
const connection = mysql.createConnection(dbConfig);

// Ouvrez la connexion à la base de données
connection.connect((error) => {
  if (error) {
    console.error(
      "Erreur de connexion à la base de données : " + error.message
    );
  } else {
    console.log("Connexion à la base de données établie.");
  }
});

module.exports = connection;
