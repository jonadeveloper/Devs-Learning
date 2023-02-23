"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("users", {
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        rank: {
            type: sequelize_1.DataTypes.ENUM("admin", "teacher", "student"),
            allowNull: false,
            defaultValue: "student",
        },
        cart: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
            defaultValue: [],
        },
        fullname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Dont enter empty strings",
                },
                len: {
                    args: [6, 128],
                    msg: "Fullname minimum length is 6",
                },
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Email have an invalid format",
                },
                notEmpty: {
                    msg: "Dont enter empty strings",
                },
                len: {
                    args: [6, 128],
                    msg: "Email minimum length is 6",
                },
            },
        },
        lastLogin: {
            type: sequelize_1.DataTypes.DATE,
        },
        banned: {
            type: sequelize_1.DataTypes.BOOLEAN,
            default: false
        }
    }, { timestamps: false });
};
