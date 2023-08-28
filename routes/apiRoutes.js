const express=require('express')
const {createTask,updateTask,deleteTask,getAllTasks}=require('../controller/apiControllers')
const router=express.Router();

router.post('/create',createTask);
router.post('/update',updateTask);
router.delete('/delete',deleteTask);
router.get('/tasks',getAllTasks);

module.exports=router;