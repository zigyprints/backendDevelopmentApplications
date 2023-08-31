import express, { Request, Response } from 'express';
const app = express();
 import cors from 'cors';

import {connectDB} from './db/connect';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/tasks';
import notFound from './middleware/not-found';
import {errorHandler} from './middleware/error-handler';

app.use(express.json());

app.use(cors());                      // Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins

app.use('/api/v1', router);           

app.use(notFound);                    // Middleware to handle 404 (Not Found) errors if no route matches

app.use(errorHandler);                // Middleware to handle errors globally


const mongoURI = process.env.MONGO_URI;

const start = async() => {
    try {
        await connectDB(mongoURI||"");
        app.listen(3000, ()=>{
            console.log('listening on port 3000'); 
        })
    } catch (error) {
        console.log(error);
        
    }
}

start();

