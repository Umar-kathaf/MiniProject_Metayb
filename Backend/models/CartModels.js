import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import UserDatas from "./UserModel.js";
import BikeDatas from "./BikesModel.js";

const Cart = sequelize.define("CartItems", {
  cartId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bikeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

//Associations
UserDatas.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(UserDatas, { foreignKey: "userId" });

BikeDatas.hasMany(Cart, { foreignKey: "bikeId" });
Cart.belongsTo(BikeDatas, { foreignKey: "bikeId" });

export default Cart;
