import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserDatas = sequelize.define(
  "UserTable",
  {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    }
  },
  {
    tableName: "UserTable",
    timestamps: true,
  }
);

export default UserDatas;
