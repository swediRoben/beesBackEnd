const { DataTypes } = require("sequelize");
const db = require("../db")

const Publication = db.define("publication", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fichier: {
        type: DataTypes.STRING,
        allowNull: true
    },
    typeFichier: {
        type: DataTypes.ENUM,
        values: ['VIDEO', 'IMAGES', 'PDF'],
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ['ACTUALITES', 'RAPPORTS', 'NEWSLETTER', 'TEMOIGNAGE'],
        defaultValue: 'ACTUALITES',
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

})

module.exports = Publication