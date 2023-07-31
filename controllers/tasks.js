const Task = require('../models/tasks')
const {createCustomError} = require('../errors/custom-error')

// Get all tasks
const getAllTasks = async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
}

// Create a new task
const createTask = async (req, res) => {
    const tasks = await Task.create(req.body)
    res.status(201).json({tasks})
}

// Get Single task
const getTask = async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID})

    // error handling incase no task found
    if (!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
}

// Update a task
const updateTasks = async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findByIdAndUpdate({_id: taskID}, req.body, {new: true, runValidators: true})

    // error handling incase no task found
    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
}

// Delete a task
const deleteTasks = async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})

    // error handling incase no task found
    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
}

module.exports = {getAllTasks, createTask, getTask, updateTasks, deleteTasks}