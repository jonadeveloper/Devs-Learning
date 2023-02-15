import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define("category", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(
        "web-development",
        "front-end",
        "back-end",
        "data-base",
        "digital-marketing",
        "social-networks",
        "advertising",
        "copywriting",
        "web-design",
        "graphic-design",
        "ux-design",
        "ui-design",
        "data-science",
        "big-data",
        "data-analytics",
        "machine-learning",
        "search-engine-optimization-(seo)"
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
};
