import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import passport from 'passport';
import todoController from  './controllers/todoController';
import User from './models/user';
import { registerUser, loginUser } from './controllers/userController';
import { authMiddleware, todoAuthMiddleware } from './middlewares/authMiddleware';
import crypto from 'crypto';

const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//USER Routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

//TODO Routes
app.get('/api/todos', authMiddleware, todoAuthMiddleware, todoController.getAllTodos);
app.post('/api/todos', authMiddleware, todoAuthMiddleware, todoController.createTodo);
app.put('/api/todos/:id', authMiddleware, todoAuthMiddleware, todoController.updateTodo);
app.delete('/api/todos/:id', authMiddleware, todoAuthMiddleware, todoController.deleteTodo);

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