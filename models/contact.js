const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Contact = sequelize.define('contact', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.ENUM,
        values: ['DEMENDE GENERALE', 'DEVENIR BENEVOLE', 'PARTENARIAT', 'DON ET FINANCEMENT', 'DEMENDE DE PRESE', 'AUTRES'],
        allowNull: false
    },
    condition: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

module.exports = Contact;