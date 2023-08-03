
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


  export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }
  
    const db = await initializeDatabase();
    db.run(
      'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
      [title, description, false],
      function (err) {
        if (err) {
          db.close();
          res.status(500).json({ error: 'Error creating task' });
          return;
        }
  
        const lastID = this.lastID;
        db.get<Task>('SELECT * FROM tasks WHERE id = ?', lastID, (err, newTask) => {
          db.close();
          if (err) {
            res.status(500).json({ error: 'Error fetching new task' });
          } else {
            res.status(201).json(newTask);
          }
        });
      }
    );
  };
  
  