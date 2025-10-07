const { Sequelize } = require('sequelize');
require('dotenv').config();

// Utiliser la chaîne de connexion complète de Railway
const sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
    dialect: 'mysql',
    logging: console.log, // facultatif : pour voir les requêtes SQL
});

module.exports = sequelize;
