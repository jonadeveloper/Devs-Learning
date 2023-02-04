"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.ENUM("Web development", "digital marketing", "ux/ui design", "data science"),
            allowNull: false
        }
    });
};
