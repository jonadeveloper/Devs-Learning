"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("category", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.ENUM("web-development", "front-end", "back-end", "data-base", "digital-marketing", "social-networks", "advertising", "copywriting", "web-design", "graphic-design", "ux-design", "ui-design", "data-science", "big-data", "data-analytics", "machine-learning", "search-engine-optimization-(seo)"),
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        img: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
    });
};
