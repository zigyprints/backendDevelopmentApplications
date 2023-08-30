import { Request, Response } from 'express';
import { Note } from '../models/NoteModel';
import pool from '../dbConfig';


export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks from the database' });
  }
};


export const createTask = async (req: Request, res: Response) => {
    const newTask: Note = req.body;
  
    if (!newTask.title) {
      return res.status(400).json({ error: 'Task title is required' });
    }
  
    try {
      const { rows } = await pool.query(
        'INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING *',
        [newTask.title, newTask.description, newTask.completed || false]
      );
  
      
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(500).json({ error: 'Error creating the task' });
      }
    } catch (error) {
      console.error('Error inserting task into database:', error);
      res.status(500).json({ error: 'Error creating the task' });
    }
  };
  


export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const updatedTask: Note = req.body;
    console.log(taskId);
  try {
    const { rows } = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE uid = $4 RETURNING *',
      [updatedTask.title, updatedTask.description, updatedTask.completed, taskId]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error inserting task into database:', error);
    res.status(500).json({ error: 'Error updating the task' });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.uid;

  try {
    await pool.query('DELETE FROM tasks WHERE uid = $1', [taskId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the task' });
  }
};
