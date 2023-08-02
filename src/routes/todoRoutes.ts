import express from 'express';
import {getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo} from '../controller/todoController';

const router = express.Router();

//route to get all the todo list
router.get('/', getAllTodos);

//route to create a new todo
router.post('/', createTodo);

//route for getting todo by passing id as params
router.get('/:id', getTodoById);

//route for updating todo by passing id as params
router.post('/:id', updateTodo);

//route for deleting todo by passing its id
router.delete('/:id', deleteTodo);


export default router;