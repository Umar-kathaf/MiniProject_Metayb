import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({quiet:true});

const sequelize = new Sequelize(
  process.env.DATABSE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
  }
);

export default sequelize;
