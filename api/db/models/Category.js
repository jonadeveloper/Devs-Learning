const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.ENUM("Web development","digital marketing","ux/ui design","data science"),
            allowNull: false
        }
    })}