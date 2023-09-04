import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export async function createTask(req: Request, res: Response) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const db = await open({
    filename: 'todo-list.db',
    driver: sqlite3.Database,
  });
  const table = await db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT)`);
  const result = await db.run('INSERT INTO tasks (title) VALUES (?)', [title]);

  res.json({ id: result.lastID, title});
}

//....

export async function getTasks(req: Request, res: Response) {
  const db = await open({
    filename: 'todo-list.db',
    driver: sqlite3.Database,
  });

  const tasks = await db.all('SELECT * FROM tasks');

  res.json(tasks);
}


// ...

export async function updateTaskById(req: Request, res: Response) {
  const taskId = req.params.id;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const db = await open({
    filename: 'todo-list.db',
    driver: sqlite3.Database,
  });

  const existingTask = await db.get('SELECT * FROM tasks WHERE id = ?', [taskId]);

  if (!existingTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await db.run('UPDATE tasks SET title = ? WHERE id = ?', [title, taskId]);

  const updatedTask = { id: taskId, title };

  res.json(updatedTask);
}

// ...


export async function deleteTaskById(req: Request, res: Response) {
  const taskId = req.params.id;

  const db = await open({
    filename: 'todo-list.db',
    driver: sqlite3.Database,
  });

  const task = await db.get('SELECT * FROM tasks WHERE id = ?', [taskId]);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await db.run('DELETE FROM tasks WHERE id = ?', [taskId]);

  res.json({ message: 'Task deleted successfully' });
}

