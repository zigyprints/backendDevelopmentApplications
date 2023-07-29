const Task = require('../models/tasks')
const {createCustomError} = require('../errors/custom-error')

// Get all tasks
const getAllTasks = async (req, res) => {
    console.log("Get all tasks")
}

// Create a new task
const createTask = async (req, res) => {
    console.log("Create Task")
}

// Get Single task
const getTask = async (req, res) => {
    console.log("Get single Task")
}

// Update a task
const updateTasks = async (req, res) => {
    console.log("Update Task")
}

// Delete a task
const deleteTasks = async (req, res) => {
    console.log("Delete Task")
}

module.exports = {getAllTasks, createTask, getTask, updateTasks, deleteTasks}