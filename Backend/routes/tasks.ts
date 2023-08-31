import express,{Request,Response} from 'express';

import { addTo, getAll, getSingleTask, removeTask, updateTask } from '../controllers/tasks';
const router = express.Router();

router.post('/add',addTo); //to create a new task
router.get('/',getAll); // this route is mainly used by admin to check all tasks present 
router.get('/:id',getSingleTask); // to get a partiular task
router.post('/update/:id',updateTask); //to update a particular task
router.delete('/:id',removeTask); // to remove a task
 

export default router;