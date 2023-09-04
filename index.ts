import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import todoRoutes from './todoRoutes';


const app = express();
app.use(bodyParser.json());
app.use(cors());

const databasePromise = open({
    filename: 'todo-list.db',
  
    driver: sqlite3.Database,
});


app.use('/api', todoRoutes); 


app.listen(3000, () => {
  console.log('Server is running http://localhost:3000/api/tasks');
  console.log('TODO WEB APP is running on http://127.0.0.1:5500/index.html');
});
