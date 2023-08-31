import sqlite from "sqlite3";

// Enable verbose mode for more detailed database information
sqlite.verbose();

class TodoModel {
    public db: sqlite.Database;

    constructor() {
        this.db = new sqlite.Database('./src/db/todo.db', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connected to the database');
            }
        });
        this.initialize();
    }

    // Initialize the database schema
    initialize() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS TASK(
                ID INTEGER PRIMARY KEY NOT NULL,
                TASK TEXT NOT NULL,
                COMPLETED BOOLEAN NOT NULL,
                ST_DATE DATETIME NOT NULL,
                FN_DATE DATETIME
            )
        `);
    }
}

export default new TodoModel();
