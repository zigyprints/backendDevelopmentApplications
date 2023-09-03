import express from "express";
import { createTodo, updateTodo, getTodo, deleteTodo } from "../controllers/allControlls";

const router = express.Router();

//route handler for creating the todo
router.post("/createtodo", createTodo)

//route handler for updating the todo
router.put("/updatetodo", updateTodo)

//route handler for getting all the todos
router.get("/gettodo", getTodo)

//route handler for deleting the todos
router.delete("/deletetodo", deleteTodo)

export default router;