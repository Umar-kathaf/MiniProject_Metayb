import { Router } from "express";
import { createBikes, getBikes } from "../controller/BikeController.js";

const router = Router();

router.get("/bikes", getBikes)
router.post("/bikes", createBikes)

export default router