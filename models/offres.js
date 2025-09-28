const { DataTypes } = require("sequelize");
const sequelize = require('../db')

const Offres = sequelize.define('offres', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    object: {
        type: DataTypes.STRING,
        allowNull: false
    },
    datedebut: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    datafin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ficher: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Offres;