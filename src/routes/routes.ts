import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  copyDataToSQLite,
} from '../controllers/task';


const router = express.Router();

router.post('/', copyDataToSQLite);
router.post('/', createTask); 
router.get('/',  getTasks);
router.get('/tasks/get/:id',  getTaskById);
router.put('/tasks/update/:id', updateTask);
router.delete('/tasks/delete/:id',  deleteTask);

export default router;
 