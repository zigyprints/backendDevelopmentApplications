import sqlite3 from 'sqlite3';

// Initializing the database and connecting to it
let db = new sqlite3.Database('./mydb.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Running a SQL query to create a tasks table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        task_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        due_date DATE,
        status TEXT NOT NULL DEFAULT 'Not Started',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME
    );
`, (err) => {
    if (err) {
        console.error("Error creating table: ", err.message);
    } else {
        console.log("Tasks table created or already exists.");
    }
});

export { db };
