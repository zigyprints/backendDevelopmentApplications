import express from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/NoteControllers';

const router = express.Router();

// Get all tasks
router.get('/tasks', getAllTasks);

// Create a new task
router.post('/tasks', createTask);

// Update an existing task
router.put('/tasks/:id', updateTask);

// Delete a task
router.delete('/tasks/:id', deleteTask);

export default router;
