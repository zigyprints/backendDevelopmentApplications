import sqlite3 from "sqlite3";

// Initialize the SQLite database by opening the "todos.db" file.
const db = new sqlite3.Database("todos.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the todos database.");
  }
});

try {
  // Attempt to create the "tasks" table if it doesn't already exist.
  db.run(
    `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  
        title TEXT,                           
        description TEXT,                     
        time DATETIME DEFAULT CURRENT_TIMESTAMP,  
        status TEXT                           
      )
    `
  );
} catch (error) {
  // If an error occurs during table creation, log the error message.
  console.error("Error creating table:", (error as any).message);
}

export default db;
