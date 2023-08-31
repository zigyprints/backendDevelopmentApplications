import express,{Request,Response} from 'express';
const app = express();
import userRouter from './routes/user'; 
import taskRouter from './routes/tasks'; 
import {connect} from './db';
import * as dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
dotenv.config();
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/task',taskRouter);
app.all('*',(req:Request,res:Response)=>{
    return res.status(404).json({message:"route not found"})
});
app.use(errorHandler);

app.listen(8002,()=>{
    console.log("server listening to 8002");
});
connect();