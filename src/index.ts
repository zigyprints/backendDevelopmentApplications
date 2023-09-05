import express, { Application } from 'express';
import sqlite3 from 'sqlite3';
import fs from "fs";
import router from './routes/getTodos'; 
const iniitalizer = sqlite3.verbose(); 


function initializeDatabase() {

    if(fs.existsSync("./store.db")){
        return new iniitalizer.Database("./store.db");
    }
    else{

    const db = new iniitalizer.Database('./store.db', (error) => {
        if (error) {
          return console.error(error.message);
        }
        createTable(db);
      });
      console.log("Connection with SQLite has been established");
      
      return db;
}
}
  
function createTable(db: any) {
    db.exec(`
    CREATE TABLE TODOS
    (
      ID INTEGER PRIMARY KEY,
      NAME   VARCHAR(50) NOT NULL,
      DETAIL   VARCHAR(50) NOT NULL
    );
  `);
  }
  

initializeDatabase();


const app: Application = express(); 


app.listen(3000, () => {
    console.log("Server running at port 3000")
})

app.use('/', router);