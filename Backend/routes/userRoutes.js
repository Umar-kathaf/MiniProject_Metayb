import { Router } from "express";
import { addBalance, createUsers, deductBalance, getUserById, loginUser, updateUserById } from "../controller/UserController.js";
import verifyToken from "../Middleware/authMiddleware.js";

const router = Router()

router.post("/signup", createUsers)
router.post("/login", loginUser)
router.get("/user", verifyToken, getUserById)
router.put("/updateuser", updateUserById)
router.post("/addbalance",verifyToken, addBalance)
router.post("/deductbalance",verifyToken, deductBalance)

router.get('/', verifyToken, (req, res) => {
    res.json({Message : "This is a protected route", userId: req.UserId})
})

export default router;