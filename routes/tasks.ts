import express from 'express';
const router = express.Router();

import ctrl from '../controllers/tasks';


//routes to handle create, retrieve, update, and delete requests

router.route('/tasks')
.get(ctrl.getTasks)
.post(ctrl.createTask)
.delete(ctrl.deleteTask);
router.route('/tasks/update/:id').patch(ctrl.updateTask);
router.route('/tasks/query').get(ctrl.getTask);

export default router;