import { Request, Response } from 'express';
import { db } from '../database';

// Create a task
const createtask = (req: Request, res: Response): void => {
    const { title, description, due_date, status } = req.body;
    console.log(title);

    if (!title) {
        res.json({ error: "Title is required" });
        return;
    }
    if (!description) {
        res.json({ error: "Description is required" });
        return;
    }
    if (!due_date) {
        res.json({ error: "Due date is required" });
        return;
    }
    if (!status) {
        res.json({ error: "Status is required" });
        return;
    }

    const sql = `INSERT INTO tasks(title, description, due_date, status) VALUES(?, ?, ?, ?)`;

    db.run(sql, [title, description, due_date, status], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log("task created");
        res.json({ id: this.lastID });
    });
};

// Fetch all tasks
const fetchtasks = (req: Request, res: Response): void => {
    const sql = `SELECT * FROM tasks`;

    db.all(sql, [], (err, tasks) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve tasks.' });
            return;
        }
        res.json(tasks);
    });
};

// Update due date of task
const update_duedate = (req: Request, res: Response): void => {
    const { due_date } = req.body;
    const taskId = req.params.id;

    const sql = `UPDATE tasks SET due_date = ? WHERE task_id = ?`;

    db.run(sql, [due_date, taskId], function (err) {
        if (err) {
            console.error(err.message);
            return;
        }
        res.status(200).json({ message: "Due date of task updated" });
    });
};

// Update task status
const update_status = (req: Request, res: Response): void => {
    const { status } = req.body;
    const taskId = req.params.id;

    const sql = `UPDATE tasks SET status = ? WHERE task_id = ?`;

    db.run(sql, [status, taskId], function (err) {
        if (err) {
            console.error(err.message);
            return;
        }
        res.status(200).json({ message: "Status of task updated" });
    });
    return;
};

// Delete a task
const deletetask = (req: Request, res: Response): void => {
    const taskId = req.params.id;
    console.log(taskId);
    
    const sql = `DELETE FROM tasks WHERE task_id = ?`;

    db.run(sql, [taskId], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete task.' });
            return;
        }

        if (this.changes === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json({ message: 'Task successfully deleted' });
        }
    });
};

export { fetchtasks, createtask, update_duedate, update_status, deletetask };
