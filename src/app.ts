import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import todoController from  './controllers/todoController';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());


app.get('/api/todos', todoController.getAllTodos);
app.post('/api/todos', todoController.createTodo);
app.put('/api/todos/:id', todoController.updateTodo);
app.delete('/api/todos/:id', todoController.deleteTodo);

//Sync db
sequelize.sync({ alter: true})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on PORT:${port}`)
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });