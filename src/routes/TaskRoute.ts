import express from 'express';
import controllers from '../controllers/TaskController';

const router = express.Router();

router.post('/create', controllers.createTask);
router.get('/get/:taskId', controllers.readTask);
router.get('/get/', controllers.readAll);
router.patch('/update/:taskId', controllers.updateTask);
router.delete('/delete/:taskId', controllers.deleteTask);

export = router;
