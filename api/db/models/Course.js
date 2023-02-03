const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('course', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.ENUM("beginner","intermediate","advanced"),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })}