"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const tasks = [];
const getTasks = (req, res) => {
    res.json(tasks);
};
exports.getTasks = getTasks;
const createTask = (req, res) => {
    const { title } = req.body;
    const id = tasks.length + 1;
    const newTask = { id, title };
    tasks.push(newTask);
    res.status(201).json({ message: 'Task created successfully', task: newTask });
};
exports.createTask = createTask;
const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title } = req.body;
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }
    taskToUpdate.title = title;
    res.json({ message: 'Task updated successfully', task: taskToUpdate });
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully', deletedTask });
};
exports.deleteTask = deleteTask;
