
import { Request, Response } from 'express';
import { initializeDatabase } from '../database/db';
import { Task } from '../models/tasks';

export const getAllTasks = async (req: Request, res: Response) => {
  const db = await initializeDatabase();
  const tasks = await db.all<Task[]>('SELECT * FROM tasks');
  await db.close();
  res.json(tasks);
};