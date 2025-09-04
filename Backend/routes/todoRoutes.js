import { Router } from "express";
import { createTodo, deleteTodo, getTodo, UpdateTodd } from "../controller/todoController.js";

const router = Router();

router.get("/todos",getTodo)
router.post("/todos", createTodo);
router.put('/todos/:id',UpdateTodd)
router.delete('/todos/:id', deleteTodo)

export default router;
