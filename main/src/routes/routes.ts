import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todo/index"

const router: Router = Router()

router.get("/todos", getTodos)  // route to get all todos

router.post("/add-todo", addTodo)  // route to add a todo

router.put("/edit-todo/:id", updateTodo)  // route to update the todo with given id

router.delete("/delete-todo/:id", deleteTodo)  // route to delete a todo with given id

export default router