import { Router } from 'express';
import * as todoController from './todoController';

const router = Router();

router.post('/tasks', todoController.createTask);
router.get('/tasks', todoController.getTasks);
router.put('/tasks/:id', todoController.updateTaskById);
router.delete('/tasks/:id', todoController.deleteTaskById);

export default router;
