import { Database, verbose } from "sqlite3";
const sqlite = verbose();

export async function openDatabase(): Promise<Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite.Database("./src/db/database.sqlite", (err) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
}

