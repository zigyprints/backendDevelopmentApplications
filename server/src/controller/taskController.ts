
import { Request, Response } from 'express';
import db from '../db';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Create Task Controller
export const createTask = (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    db.run(
      'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
      [title, description, 0],
      function (err) {
        if (err) {
          console.error('Error creating task:', err.message);
          return res.status(500).json({ error: 'Failed to create task' });
        }
        const newTaskId = this.lastID;
        return res.status(201).json({ id: newTaskId, title, description, completed: 0 });
      }
    );
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

// Get All Tasks Controller
export const getAllTasks = (req: Request, res: Response) => {
  try {
    db.all('SELECT * FROM tasks', (err, rows) => {
      if (err) {
        console.error('Error getting tasks:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve tasks' });
      }
      return res.status(200).json(rows);
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

// Get a Single Task  Controller
export const getTaskById = (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id, 10);

    db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
      if (err) {
        console.error('Error getting task:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve task' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Task not found' });
      }

      return res.status(200).json(row);
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

// Update Task Controller
export const updateTaskById = (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, completed } = req.body;

    db.run(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description, completed, taskId],
      function (err) {
        if (err) {
          console.error('Error updating task:', err.message);
          return res.status(500).json({ error: 'Failed to update task' });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json({ id: taskId, title, description, completed });
      }
    );
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

// Delete a Task Controller
export const deleteTaskById = (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id, 10);

    db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
      if (err) {
        console.error('Error deleting task:', err.message);
        return res.status(500).json({ error: 'Failed to delete task' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      return res.status(204).send({message:"Task deleted successfully"});
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
