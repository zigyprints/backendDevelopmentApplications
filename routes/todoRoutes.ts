// src/routes/todoRoutes.ts
import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/todoController';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
