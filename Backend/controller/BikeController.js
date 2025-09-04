import BikeDatas from "../models/BikesModel.js";
import { Op } from "sequelize";
export const createBikes = async (req, res) => {
  try {
    const { BikeName, Model, Price, ReleaseYear } = req.body;
    if (!BikeName || !Model || !Price || !ReleaseYear) {
      return res.status(400).json({ message: "All BikeDatas is required" });
    }
    const Bikes = await BikeDatas.create({
      BikeName: BikeName,
      Model: Model,
      Price: Price,
      ReleaseYear: ReleaseYear,
    });
    return res
      .status(201)
      .json({ message: "Bike Datas add successfully", Bikes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export const getBikes = async (req, res) => {
  try {
    const { search, price } = req.query;
    let whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { BikeName: { [Op.iLike]: `%${search}%` } },
        { Model: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (price === "low") {
      whereClause.Price = { [Op.lt]: 100000};
    } else if (price === "mid") {
      whereClause.Price = { [Op.between]: [100000, 200000]}
    } else if (price === "high") {
      whereClause.Price = { [Op.gt]: [200000]}
    }
    
    const bikeLists = await BikeDatas.findAll({ where: whereClause });
    return res.json({ message: "Fetched bike datas successfully", bikeLists });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};
