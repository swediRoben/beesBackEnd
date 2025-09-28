const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Contact = sequelize.define('coordonnee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

module.exports = Contact;