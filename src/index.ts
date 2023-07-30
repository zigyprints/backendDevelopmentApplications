import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function setupDatabase() {
  try {
    const db = await open({
      filename: './mydatabase.sqlite',
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        heading TEXT NOT NULL,
        content TEXT
      );
    `);

    return db;
  } catch (error) {
    console.error('Error setting up the database:', error);
    throw error;
  }
}

const initializeApp = async () => {
  const db = await setupDatabase();

  app.get('/api/todos', async (req: Request, res: Response) => {
    try {
      const todos = await db.all('SELECT * FROM todos;');
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/api/todos/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const todo = await db.get('SELECT * FROM todos WHERE id = ?;', [id]);
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.post('/api/todos', async (req: Request, res: Response) => {
    const { heading, content } = req.body;
    try {
      const result = await db.run('INSERT INTO todos (heading, content) VALUES (?, ?);', [
        heading,
        content,
      ]);
      const newTodo = { id: result.lastID, heading, content };
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.put('/api/todos/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { heading, content } = req.body;
    try {
      const result = await db.run('UPDATE todos SET heading = ?, content = ? WHERE id = ?;', [
        heading,
        content,
        id,
      ]);
      if (result.changes > 0) {
        const updatedTodo = { id: parseInt(id), heading, content };
        res.json(updatedTodo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.delete('/api/todos/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const result = await db.run('DELETE FROM todos WHERE id = ?;', [id]);
      if (result.changes > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  const port = 8080;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

initializeApp().catch((error) => {
  console.error('Error initializing the app:', error);
});
