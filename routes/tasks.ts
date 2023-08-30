import express from 'express';
const router = express.Router();

import ctrl from '../controllers/tasks';



router.route('/')
.get(ctrl.getTasks)
.post(ctrl.createTask)
.delete(ctrl.deleteTask);
router.route('/update/:id').patch(ctrl.updateTask);
router.route('/tasks/query').get(ctrl.getTask);

export default router;