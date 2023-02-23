import { DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
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
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descriptionComplete: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instructor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
        },
        deleted: {
            type: DataTypes.BOOLEAN,
        }
    })
}