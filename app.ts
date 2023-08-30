import express, { Request, Response } from 'express';
const app = express();
 import cors from 'cors';

import {connectDB} from './db/connect';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/tasks';

app.use(express.json());

app.use(cors());
app.use('/', router);



// app.get('/', (req: Request, res: Response)=>{
//     res.send('hello planet');
// })
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

console.log('hello');