import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  const db = await open({
    filename: 'database/todo.db',
    driver: sqlite3.Database,
  });

  // Create the 'todo' table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      isCompleted INTEGER NOT NULL
    )
  `);

  return db;
}
