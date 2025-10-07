const { Sequelize } = require('sequelize');
require('dotenv').config();

// Vérifier si on est sur Railway (prod) ou local (dev)
const isProduction = !!process.env.MYSQL_PUBLIC_URL;

const sequelize = isProduction
  ? // Production : utiliser la chaîne publique Railway
    new Sequelize(process.env.MYSQL_PUBLIC_URL, {
      dialect: 'mysql',
      logging: console.log,
    })
  : // Développement local : utiliser les variables de .env
    new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: console.log,
      }
    );

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connecté à MySQL (${isProduction ? "Railway" : "Local"}) !`);
  } catch (err) {
    console.error("❌ Erreur de connexion MySQL :", err);
  }
})();

module.exports = sequelize;
