import express from 'express';
import {getTaskById, getAllTasks, createTask, updateTask, deleteTask } from '../controllers/NoteControllers';

const router = express.Router();

router.get('/task/:id', getTaskById);
// Get all tasks
router.get('/tasks', getAllTasks);

// Create a new task
router.post('/task', createTask);

// Update an existing task
router.put('/task/:id', updateTask);

// Delete a task
router.delete('/task/:id', deleteTask);

export default router;
