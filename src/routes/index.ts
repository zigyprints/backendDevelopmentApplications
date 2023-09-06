import express from "express";
import { home, getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo }
    from "../controllers/index";

const router = express.Router();

router.get("/", home); // default route

router.get("/todos", getAllTodos);
router.get("/todos/:id", getTodoById);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
