import {Database} from 'sqlite3';
import "dotenv/config";

export async function initializeDatabase() {

  return new Promise<Database>((resolve, reject) => {
    const db = new Database(`./${process.env.DB}`, (err) => {
      if (err) {
        console.log("Database Unable to Connect");
        reject(err);
      } else {
        console.log('Database Connected!!');
        
        db.run(`
          CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
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

