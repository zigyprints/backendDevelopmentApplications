import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/todoModel';

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing todos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the todo.
 *         title:
 *           type: string
 *           description: The title of the todo.
 *         description:
 *           type: string
 *           description: The description of the todo.
 *         done:
 *           type: boolean
 *           description: Indicates whether the todo is completed.
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve a list of all todos.
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo with the provided data.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 */
export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo: ITodo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Update a todo with the provided ID and data.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Todo not found
 */
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const todo: ITodo | null = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo with the provided ID.
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const todo: ITodo | null = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};
