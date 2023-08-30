// src/controllers/todoController.ts
import { Request, Response } from 'express';

interface Task {
    id: number;
    title: string;
}

const tasks: Task[] = [];

export const getTasks = (req: Request, res: Response): void => {
    res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
    const { title } = req.body;
    const id = tasks.length + 1;
    const newTask: Task = { id, title };
    tasks.push(newTask);
    res.status(201).json({ message: 'Task created successfully', task: newTask });
};

export const updateTask = (req: Request, res: Response): void => {
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

export const deleteTask = (req: Request, res: Response): void => {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully', deletedTask });
};
