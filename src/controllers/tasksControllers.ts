
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
  
  export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
  
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }
  
    const db = await initializeDatabase();
    await db.run('UPDATE tasks SET title=?, description=?, completed=? WHERE id=?', [
      title,
      description,
      completed,
      id,
    ]);
    const updatedTask = await db.get<Task>('SELECT * FROM tasks WHERE id = ?', id);
    await db.close();
  
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  };

  export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const db = await initializeDatabase();
    await db.run('DELETE FROM tasks WHERE id = ?', id);
    await db.close();
    res.sendStatus(204);
  };
  