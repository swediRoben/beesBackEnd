const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Donation = sequelize.define('donation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    donateur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    devise: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['CONFIRME', 'EN_ATTENTE'],
        defaultValue: 'EN_ATTENTE',
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Donation;