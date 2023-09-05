import sqlite3 from 'sqlite3';
import uuid from "crypto";


const iniitalizer = sqlite3.verbose(); 


let db = new iniitalizer.Database('./store.db'); 
      console.log("Connection with SQLite has been established");

db.exec(`
      CREATE TABLE IF NOT EXISTS TODOS
      (
        id VARCHAR PRIMARY KEY,
        title   VARCHAR NOT NULL,
        details   VARCHAR NOT NULL, 
        status INTEGER NOT NULL

      );
    `);

// db.exec(`INSERT INTO TODOS VALUES ("${uuid.randomUUID()}", "First", "lorem ipsum", 1)`); 

export default db;