import { Request, Response } from "express";
import { Task, NewTask } from "../models/Task";
import { openDatabase } from "../db/database";

// Function to render the "index" view with tasks data
export const renderIndex = async (req: Request, res: Response) => {
  const db = await openDatabase();
  try {
    // Fetch all tasks from the database
    db.all("SELECT * FROM tasks", (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const tasks: Task[] = (rows as Task[]).map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        completed: !!row.completed,
      }));

    // Render the "index" view with the tasks data
    res.render("index", { tasks });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.close();
  }
};

// get task for postman request
export const getAllTasks = async (req: Request, res: Response) => {
  const db = await openDatabase();
  try {
    db.all("SELECT * FROM tasks", (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const tasks: Task[] = (rows as Task[]).map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        completed: !!row.completed,
      }));

      res.json(tasks);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.close();
  }
};

export const createTask = async (req: Request, res: Response) => {
  const newTask: NewTask = req.body;
  if (!newTask.title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  const db = await openDatabase();
  try {
    // Check if the 'tasks' table exists, and create it if not present
    await db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER NOT NULL DEFAULT 0
      )
    `);

    // Insert the new task into the 'tasks' table
    const task = await db.prepare(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)"
    );

    const result = await task.run(newTask.title, newTask.description, 0);
    await task.finalize();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.close();
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const updatedTask: Task = req.body;
  if (!updatedTask.title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  const db = await openDatabase();
  try {
    await db.run("UPDATE tasks SET title=?, description=?, completed=? WHERE id=?", [
      updatedTask.title,
      updatedTask.description || "",
      updatedTask.completed ? 1 : 0,
      taskId,
    ]);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.close();
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const db = await openDatabase();
  try {
    await db.run("DELETE FROM tasks WHERE id=?", taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.close();
  }
};
