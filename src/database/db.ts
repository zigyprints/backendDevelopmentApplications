
import sqlite3 from 'sqlite3';

export async function initializeDatabase() {
  return new Promise<sqlite3.Database>((resolve, reject) => {
    const db = new sqlite3.Database('./database.sqlite', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}
