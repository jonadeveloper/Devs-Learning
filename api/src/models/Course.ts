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
<<<<<<< HEAD
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
=======
        level: {
            type: DataTypes.ENUM("beginner","intermediate","advanced"),
>>>>>>> development
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
<<<<<<< HEAD
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
=======
>>>>>>> development
        price: {
            type: DataTypes.STRING,
            allowNull: false
        }
<<<<<<< HEAD
    })
}
=======
    })}
>>>>>>> development
