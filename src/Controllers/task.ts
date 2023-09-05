import { Request, Response } from 'express';
import Task, { ITask } from '../models/models1';
import db from '../models/models';

// Create a new task in SQLite and MongoDB
// Create a new task in SQLite and MongoDB
const Task1 = []
export const copyDataToSQLite = async (req: Request, res: Response) => {
  try {
    // Retrieve data from MongoDB
    const mongoTasks = await Task.find().exec();

    // Validate and insert data into SQLite
    const validTasks: ITask[] = [];
    const invalidTasks: any[] = [];

    for (const mongoTask of mongoTasks) {
      // Validate the ID (you can define your validation logic here)
      if (isValidId(mongoTask._id)) {
        validTasks.push(mongoTask);
      } else {
        invalidTasks.push(mongoTask);
      }
    }

    // Insert valid tasks into SQLite
    for (const task of validTasks) {
      const {title, description, status, dueDate } = task;
      const a =  task._id.toString()
      
       
      const sql = 'INSERT INTO tasks (id , title, description, status, dueDate) VALUES (? ,?, ?, ?, ?)';
      db.run(sql, [a ,title, description, status, dueDate], (err) => {
        if (err) {
          console.error('Error inserting task into SQLite:', err);
        }
      });
    }

    return res.status(200).json({
      message: 'Data copied to SQLite',
      validTasks,
      invalidTasks,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Error copying data', details: err });
  }
};

// Example ID validation function (customize as needed)
function isValidId(id: string): boolean {
  // Implement your ID validation logic here
  // For example, you can check if the ID is a valid ObjectId
  // using a library like 'mongoose' or validate against your specific criteria
  return true; // Replace with your validation logic
}
export const createTask = async (req: Request, res: Response) => {
  
  const { id , title, description, status, dueDate } = req.body;
  console.log(req.body);
  
  try { 
    // Create and save a task in SQLite
    const sqliteInsert = await new Promise<number>((resolve, reject) => {
      const sql = 'INSERT INTO tasks (id , title, description, status, dueDate) VALUES (? ,?, ?, ?, ?)';
      db.run(sql, [id , title, description, status, dueDate], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
          console.log(title);
        }
      }); 
    });

    // Create and save a task in MongoDB
    const task = new Task({ title, description, status, dueDate });
    const savedTask = await task.save(); 

    return res.status(201).json({ taskId: sqliteInsert, savedTask });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating task', details: err });
  }
};


// Retrieve tasks from both MongoDB and SQLite
// Retrieve tasks from both MongoDB and SQLite
export const getTasks = async (req: Request, res: Response) => {
  try {
    // Retrieve tasks from SQLite
    const sqliteTasks = await new Promise<ITask[]>((resolve, reject) => {
      const sql = 'SELECT * FROM tasks';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const tasks: ITask[] = rows as ITask[];
          resolve(tasks);
        }
      });
    });

    // Retrieve tasks from MongoDB
    const mongoTasks = await Task.find().exec();
    Task1.push(mongoTasks);
    console.log(mongoTasks);
    return res.status(200).json({ sqliteTasks, mongoTasks });

  } catch (err) {
    return res.status(500).json({ error: 'Error retrieving tasks', details: err });
  }
};


// Retrieve a task by ID from both MongoDB and SQLite
// Retrieve a task by ID from both MongoDB and SQLite
export const getTaskById = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  try {
    // Retrieve task from SQLite
    const sqliteTask = await new Promise<ITask | null>((resolve, reject) => {
      const sql = 'SELECT * FROM tasks WHERE id = ?';
      db.get(sql, [taskId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          const task: ITask | null = row as ITask | null;
          resolve(task);
        }
      });
    });

    // Retrieve task from MongoDB
    const mongoTask = await Task.findById(taskId).exec();

    if ((!sqliteTask && sqliteTask !== null) && !mongoTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ sqliteTask, mongoTask });
  } catch (err) {
    return res.status(500).json({ error: 'Error retrieving task', details: err });
  }
};


// Update a task in both MongoDB and SQLite
// Update a task in both MongoDB and SQLite
export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { title, description, status, dueDate } = req.headers;

  try {
    // Update task in SQLite
    const sqliteUpdate = await new Promise<void>((resolve, reject) => {
      const sql = 'UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE id = ?';
      db.run(sql, [title, description, status, dueDate, taskId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(); // Resolve without a value
        }
      });
    });

    // Update task in MongoDB
    const mongoUpdate = await Task.findByIdAndUpdate(taskId, { title, description, status, dueDate }).exec();

    if ((sqliteUpdate === undefined || sqliteUpdate === null) && !mongoUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error updating task', details: err });
  }
};


// Delete a task from both MongoDB and SQLite
// Delete a task from both MongoDB and SQLite
export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  try {
    // Delete task from SQLite
    const sqliteDelete = await new Promise<void>((resolve, reject) => {
      const sql = 'DELETE FROM tasks WHERE id = ?';
      db.run(sql, [taskId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(); // Resolve without a value
        }
      });
    });

    
    const mongoDelete = await Task.findByIdAndDelete(taskId).exec();

    if ((sqliteDelete === undefined || sqliteDelete === null) && !mongoDelete) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error deleting task', details: err });
  }
};

