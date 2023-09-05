import { createTask, deleteTaskById, getAllTasks, getTaskById, updateTaskById } from './../controller/taskController';

import express from 'express';



const router = express.Router();

// Create a new task
router.post('/',createTask);

// Get all tasks
router.get('/', getAllTasks);

// Get a specific task by ID
router.get('/:id', getTaskById);

// Update a task by ID
router.put('/:id', updateTaskById);

// Delete a task by ID
router.delete('/:id', deleteTaskById);

export default router;
