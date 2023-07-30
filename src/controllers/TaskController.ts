import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Task from '../models/TaskModel';

const createTask = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    return task
        .save()
        .then((task) => res.status(201).json({ task }))
        .catch((error) => res.status(500).json({ error }));
};

const readTask = (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId;

    return Task.findById(taskId)
        .then((task) => (task ? res.status(200).json({ task }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Task.find()
        .then((tasks) => res.status(200).json({ tasks }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTask = (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId;

    return Task.findById(taskId)
        .then((task) => {
            if (task) {
                task.set(req.body);
                return task
                    .save()
                    .then((task) => res.status(201).json({ task }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTask = (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId;
    return Task.findByIdAndDelete(taskId)
        .then((task) => (task ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => {
            res.status(500).json({ error });
        });
};

export default { createTask, readTask, readAll, updateTask, deleteTask };
