import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
} from "../controllers/todoController";

const router = express.Router();

//create todo
router.post('/', createTodo);

//get all todos
router.get("/", getAllTodos);

//get todo by id
router.get("/:_id", getTodoById);

export default router;