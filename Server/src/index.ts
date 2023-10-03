import express,{ Express,Request,Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import userrouter from './Routes/userRoutes.js';
import chatrouter from './Routes/chatRoutes.js';
import messagerouter from './Routes/messageRoutes.js';
import cookieParser from 'cookie-parser'

const app:Express = express();
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connection established"))
.catch((error)=> console.log("MongoDB Connection failed",error.message))

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

const port:Number = 3000;

//Authentication Routes
app.use('/api/users',userrouter)

//Chat Routes
app.use('/api/chat',chatrouter)

//Message Routes
app.use('/api/messages',messagerouter)



app.get('/',(req:Request,res:Response)=>{
    res.json("Server Running")
})



app.listen(port, ()=>{
    console.log(`Server Running on port:${port}`); 
});
