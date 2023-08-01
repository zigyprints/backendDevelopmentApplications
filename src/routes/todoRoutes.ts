import express from "express";
import { createTodo } from '../controllers/todoController'

const router = express.Router();

//create todo
router.post('/', createTodo);

export default router;