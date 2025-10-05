const { DataTypes } = require("sequelize");
const db = require("../db")

const Projet = db.define("projet", {
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
    secteur: {
        type: DataTypes.ENUM,
        values: ['EDUCATION', 'SANTE', 'ENVIRONNEMENT'],
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['BROUILLON', 'ENCOURS', 'REALISER'],
        defaultValue: 'BROUILLON',
        allowNull: false
    },
    beneficier: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    budget: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    devise: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avencement: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'pourcentage'
    },
    debut: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fin: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = Projet