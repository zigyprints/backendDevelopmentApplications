
import { Request, Response } from 'express';
import { initializeDatabase } from '../database/db';
import { Task } from '../models/tasks';

export const getAllTasks = async (req: Request, res: Response) => {
  const db = await initializeDatabase();
  const tasks = await db.all<Task[]>('SELECT * FROM tasks');
  await db.close();
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const db = await initializeDatabase();
    const task = await db.get<Task>('SELECT * FROM tasks WHERE id = ?', id);
    await db.close();
  
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  };

  