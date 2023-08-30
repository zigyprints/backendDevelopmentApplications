// src/init-db.ts
import { connect } from './config/db';

async function initialize() {
    const db = await connect();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT
    )
  `);
}

initialize().then(() => {
    console.log('Database initialized');
});
