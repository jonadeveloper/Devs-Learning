"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('course', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: sequelize_1.DataTypes.ENUM("beginner", "intermediate", "advanced"),
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        descriptionComplete: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        duration: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        instructor: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
            defaultValue: []
        },
        deleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
        }
    });
};
