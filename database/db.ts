/**
 * This file contains function to connect database
 * While connecting to database, users and todos tables are created if doesn't exist
 */

import sqlite3, { Database } from "sqlite3";
const filePath = "database/app.db";

// function to establish connection to data base
const connectDB = (): Database => {
  let db = new sqlite3.Database(filePath, (error) => {
    if (error) {
      console.error("Error occur in connecting to database");
    }
    createUserTable(db);
    createToDoTable(db);
    console.log("Successfully connected to database");
  });

  return db;
};

// function to create users table
const createUserTable = (db: Database) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);
};

// function to create todos table
const createToDoTable = (db: Database) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo TEXT NOT NULL,
      isCompleted BOOLEAN default false
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
};

module.exports = connectDB();
