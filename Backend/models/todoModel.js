import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TodoTable = sequelize.define(
  "TodoTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "TodoTable",
    timestamps: true,
  }
);

export default TodoTable;
