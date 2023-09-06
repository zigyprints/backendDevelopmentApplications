import sqlite3 from 'sqlite3';
import uuid from "crypto";


const iniitalizer = sqlite3.verbose(); 

//initialize DB 


let db = new iniitalizer.Database('./store.db'); 
      console.log("Connection with SQLite has been established");

//CREATING TABLE IF IT DOESN'T EXIST 

db.exec(`
      CREATE TABLE IF NOT EXISTS TODOS
      (
        id VARCHAR PRIMARY KEY,
        title   VARCHAR NOT NULL,
        details   VARCHAR NOT NULL, 
        status INTEGER NOT NULL

      );
    `);


export default db;