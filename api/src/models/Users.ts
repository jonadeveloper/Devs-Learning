import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      rank: {
        type: DataTypes.ENUM("admin", "teacher", "student"),
        allowNull: false,
        defaultValue: "student",
      },
      cart: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      fullname: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.DATE,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    },
    { timestamps: false }
  );
};
