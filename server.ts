export {};
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

const app:any  = require('./app.ts');

dotenv.config({path: './config.env'});

const db=new sqlite3.Database('./DB/todo.db',sqlite3.OPEN_READWRITE, (err:any) => {
    if (err) {
      return console.error(err.message);
    }
    
    console.log('Connected to the todo database.');
});


const port = process.env.PORT || 5000;

const server = app.listen(port,()=> {
  console.log(`App is running in port ${port}`);
});

