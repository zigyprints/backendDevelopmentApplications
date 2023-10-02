import express,{ Express,Request,Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import router from './Routes/userRoutes.js';

const app:Express = express();
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connection established"))
.catch((error)=> console.log("MongoDB Connection failed",error.message))
// const bcryptsalt = bcrypt.genSaltSync(10)
// const jwtSecret = "kjsdhoi4r9r8o89yr29h9rh230hne3y02u208e4j320j082ur023ne4fyw0r0er3684f96wr163wr62341"

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use('/api/users',router)

const port:Number = 3000;

app.get('/test',(req:Request,res:Response)=>{
    res.json("test")
})

app.get('/',(req:Request,res:Response)=>{
    res.send("test")
})



app.listen(port, ()=>{
    console.log(`Server Running on port:${port}`); 
});
