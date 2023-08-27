import express from 'express';
import { 
    fetchtasks, 
    createtask, 
    update_duedate, 
    deletetask, 
    update_status 
} from '../controllers/taskcontroller';

const router = express.Router();

// Endpoint to retrieve all tasks
router.get('/', fetchtasks);

// Endpoint to create a new task
router.post('/', createtask);

// Endpoint to update the due date of a task
router.patch('/:id', update_duedate);

// Endpoint to update the status of a task
router.patch('/status/:id', update_status);

// Endpoint to delete a task
router.delete('/:id', deletetask);

export default router;
