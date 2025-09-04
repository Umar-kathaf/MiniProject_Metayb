import UserDatas from "../models/UserModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const createUsers = async (req, res) => {
  const { FirstName, LastName, Email, Mobile, Password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await UserDatas.create({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Mobile: Mobile,
      Password: hashedPassword,
    });
    console.log("user Data", user);

    return res
      .status(201)
      .json({ Message: "User register successfully", user });
  } catch (error) {
    return res.status(500).json({ Message: "invalid creation", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const  UserId  = req.user.id;
    if (!UserId) {
      return res.status(400).json({ Message: "UserId is required" });
    }
    const user = await UserDatas.findOne({
      where: { UserId },
      attributes: ["UserId", "FirstName", "LastName", "Email", "balance"],
    });
    

    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ Message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await UserDatas.findOne({ where: { Email } });

    if (!user) {
      return res.status(404).json({ Error: "user not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ Error: "Email and Password didn't match" });
    }
    const token = JWT.sign({ id: user.UserId }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });
    return res.status(200).json({ Message: "Login successfull", token, user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Add money to user
export const addBalance = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const { amount } = req.body;
    // console.log(userId);
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ Error: "Invalid amount" });
    }

    const user = await UserDatas.findByPk(userId);
    if (!user) {
      return res.status(404).json({ Error: "user not found" });
    }

    user.balance += amount;
    await user.save();

    res.json({
      message: `Amount ${amount} added in your account`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// deduct money from user
export const deductBalance = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ Error: "Invalid amount" });
    }

    const user = await UserDatas.findByPk(userId);
    if (!user) {
      return res.status(404).json({ Error: "user not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= amount;
    await user.save();

    res.json({
      message: `Amount ${amount} deducted in your account`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update user by Id
export const updateUserById = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Mobile, balance } = req.body;
    const user = await UserDatas.findByPk(req.query.UserId);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    await user.update({ FirstName, LastName, Email, Mobile, balance });
    return res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
