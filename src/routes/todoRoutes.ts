import express from "express";
import { createTodo, getAllTodos } from "../controllers/todoController";

const router = express.Router();

//create todo
router.post('/', createTodo);

//get all todos
router.get("/", getAllTodos);

export default router;