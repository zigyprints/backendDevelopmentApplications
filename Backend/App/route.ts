import { Router, Request, Response } from 'express';
import { createTask, getTask, updateTask, deleteTask } from '../CRUD/exportAll'

// acquire Router
const router = Router();

// create route
router.post('/tasks', createTask)

// retrieve route
router.get('/tasks', getTask)

// update route
router.put('/tasks/:id', updateTask)

// delete route
router.delete('/tasks/:id', deleteTask)

// export router to index.ts
export default router;