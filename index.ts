import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database('todo.db'); // SQLite database

// Middleware to parse JSON requests
app.use(express.json());



// GET all tasks
app.get('/tasks', (req: Request, res: Response) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: ' Error' });
    } else {
      res.json(rows);
    }
  });
});

// POST a new task
app.post(
  '/tasks',[
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const completed = false;

    db.run(
      'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
      [title, description, completed],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({
            id: this.lastID,
            title,
            description,
            completed,
          });
        }
      }
    );
  }
);

// Add other endpoints (PUT, DELETE) as needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
