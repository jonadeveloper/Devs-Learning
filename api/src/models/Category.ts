import { DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.ENUM("Web development","digital marketing","ux/ui design","data science"),
            allowNull: false
        }
    })}