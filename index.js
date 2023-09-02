const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Your routes will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasks.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN)');
});


// Create a new task
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;
  const query = 'INSERT INTO tasks (title, completed) VALUES (?, ?)';
  db.run(query, [title, completed], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to create task' });
      return;
    }
    res.status(201).json({ id: this.lastID, title, completed });
  });
});

// Retrieve all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
      return;
    }
    res.json(rows);
  });
});

// Retrieve a single task by ID
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to retrieve task' });
      return;
    }
    res.json(row);
  });
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to update task' });
      return;
    }
    res.json({ id, title, completed });
  });
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to delete task' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

