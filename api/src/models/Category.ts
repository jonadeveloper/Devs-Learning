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
            type: DataTypes.ENUM("Web-Development","Front-End","Back-End","Data-Base",
            "Digital-Marketing","Social-Networks","Advertising","Copywriting","Seo",
            "Web-Design","Graphic-Design","UX-Design","UI-Design",
            "Data-Science","Big-Data","Data-Analytics","Machine-Learning"),
            allowNull: false
        }
    })}