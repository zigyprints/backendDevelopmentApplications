const express = require('express');
const Router = express.Router();
const taskController = require('../controllers/taskController.ts');


// get all task for user (user)
Router.get('/',taskController.getTask);

// post a task (userId will be in req.body)
Router.post('/',taskController.createTask);

// update a task (userId and taskid will be in req.body)
Router.patch('/:taskId',taskController.updateTask);

// delete the task with id
// the userid will be in req.boady as ideally we will have a Auth middleware
// so we will have user on req.body.user

Router.delete('/:taskId',taskController.deleteTask);


module.exports = Router;