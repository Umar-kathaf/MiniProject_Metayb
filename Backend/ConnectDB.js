import sequelize from "./config/db.js";
import TodoTable from "./models/todoModel.js";
import BikeDatas from "./models/BikesModel.js";
import UserDatas from "./models/UserModel.js";
import Cart from "./models/CartModels.js";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    // await UserDatas.sync({alter:true})
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
};

export default syncDatabase;
