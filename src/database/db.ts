
import sqlite3 from 'sqlite3';

export async function initializeDatabase() {
  return new Promise<sqlite3.Database>((resolve, reject) => {
    const db = new sqlite3.Database("../database.sqlite", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Database connection successful');
        
        db.run(`
          CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed BOOLEAN NOT NULL
          )
        `, (createTableErr) => {
          if (createTableErr) {
            reject(createTableErr);
          } else {
            resolve(db);
          }
        });
      }
    });
  });
}

