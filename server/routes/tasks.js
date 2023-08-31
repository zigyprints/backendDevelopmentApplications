const express=require('express');
const { getAllTasks,createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');

const router=express.Router();



router.route('/').get(getAllTasks).post(createTask);;   // in this way defination is here the function of route is in another file makes it cleaner code 


router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask); // They are chained here so that on the same route we can perdorm all these operations


module.exports=router;