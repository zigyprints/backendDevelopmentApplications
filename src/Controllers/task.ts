import { Request, Response } from 'express';
import Task, { ITask } from '../models/models1';
import db from '../models/models';

const Task1 = []
export const copyDataToSQLite = async (req: Request, res: Response) => {
  try {
    const mongoTasks = await Task.find().exec();

    const validTasks: ITask[] = [];
    const invalidTasks: any[] = [];

    for (const mongoTask of mongoTasks) {
      if (isValidId(mongoTask._id)) {
        validTasks.push(mongoTask);
      } else {
        invalidTasks.push(mongoTask);
      }
    }

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

function isValidId(id: string): boolean {
  return true;
}
export const createTask = async (req: Request, res: Response) => {
  
  const { id , title, description, status, dueDate } = req.body;
  console.log(req.body);
  
  try { 
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
    const task = new Task({ title, description, status, dueDate });
    const savedTask = await task.save(); 

    return res.status(201).json({ taskId: sqliteInsert, savedTask });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating task', details: err });
  }
};


export const getTasks = async (req: Request, res: Response) => {
  try {
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

    const mongoTasks = await Task.find().exec();
    Task1.push(mongoTasks);
    console.log(mongoTasks);
    return res.status(200).json({ sqliteTasks, mongoTasks });

  } catch (err) {
    return res.status(500).json({ error: 'Error retrieving tasks', details: err });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  try {
   
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

   
    const mongoTask = await Task.findById(taskId).exec();

    if ((!sqliteTask && sqliteTask !== null) && !mongoTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ sqliteTask, mongoTask });
  } catch (err) {
    return res.status(500).json({ error: 'Error retrieving task', details: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { title, description, status, dueDate } = req.headers;

  try {
    
    const sqliteUpdate = await new Promise<void>((resolve, reject) => {
      const sql = 'UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE id = ?';
      db.run(sql, [title, description, status, dueDate, taskId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

   
    const mongoUpdate = await Task.findByIdAndUpdate(taskId, { title, description, status, dueDate }).exec();

    if ((sqliteUpdate === undefined || sqliteUpdate === null) && !mongoUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error updating task', details: err });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  try {
    const sqliteDelete = await new Promise<void>((resolve, reject) => {
      const sql = 'DELETE FROM tasks WHERE id = ?';
      db.run(sql, [taskId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
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

