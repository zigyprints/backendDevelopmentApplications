import { Request, Response } from "express";
import db from "../db";

// Define the structure of a task
interface Task {
  id: number;
  title: string;
  description: string;
  time?: string; // Time is optional because it's automatically generated
  status: string;
}

// Create a new task
export const createTask = (req: Request, res: Response): void => {
  // Destructure values from the request body
  const { title, description, status } = req.body;

  // Check if required fields are missing
  if (!title || !description || !status) {
    res.status(400).json({
      message: "Please fill all required fields",
    });
    return;
  }

  // SQL query to insert a new task, 'time' is automatically generated
  const sql = `INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)`;
  db.run(sql, [title, description, status], (err) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    return res.json({
      message: "Task created successfully",
    });
  });
};

// Get all tasks
export const getTasks = (req: Request, res: Response): void => {
  // SQL query to retrieve all tasks
  const sql = `SELECT * FROM tasks`;

  db.all(sql, [], (err, tasks: Task[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve tasks." });
      return;
    }
    res.json(tasks);
  });
};

// Get a task by ID
export const getTaskById = (req: Request, res: Response): void => {
  const id = req.params.id; // Extract the task ID from the request parameters

  // SQL query to retrieve a task by ID
  const sql = `SELECT * FROM tasks WHERE id = ?`;

  db.get(sql, [id], (err, task: Task | undefined) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve task." });
      return;
    }
    if (!task) {
      res.status(404).json({ message: "Task not found." });
      return;
    }
    res.json(task);
  });
};

// Update a task by ID
export const updateTask = (req: Request, res: Response): void => {
  const id = req.params.id; // Extract the task ID from the request parameters
  const { title, description, status } = req.body;

  // Check if required fields are missing
  if (!title || !description || !status) {
    res.status(400).json({
      message: "Please fill all required fields",
    });
    return;
  }

  // SQL query to update a task by ID
  const sql = `UPDATE tasks SET title = ?, description = ?, time = CURRENT_TIMESTAMP, status = ? WHERE id = ?`;

  db.run(sql, [title, description, status, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update task." });
      return;
    }
    res.json({ message: "Task updated successfully" });
  });
};

// Delete a task by ID
export const deleteTask = (req: Request, res: Response): void => {
  const id = req.params.id; // Extract the task ID from the request parameters

  // SQL query to delete a task by ID
  const sql = `DELETE FROM tasks WHERE id = ?`;

  db.run(sql, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete task." });
      return;
    }
    res.json({ message: "Task deleted successfully" });
  });
};
