// src/db.ts

import sqlite3 from 'sqlite3';

// Function to create a database connection
export function createDBConnection(): sqlite3.Database {
  const db = new sqlite3.Database('database.db');
  return db;
}
