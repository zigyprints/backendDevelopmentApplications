import express from 'express';
import {getAllTodos, createTodo} from '../controller/todoController';

const router = express.Router();

//route to get all the todo list
router.get('/', getAllTodos);

//route to create a new todo
router.post('/create', createTodo);


export default router;