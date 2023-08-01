import express, { Request, Response } from "express";
import dotenv from "dotenv";

//paths
import connectDB from './config/dbConnection';

const app = express();

//configuring env
dotenv.config();

//Db connection
connectDB();

//test route
app.get('/', (req: Request, res: Response) =>{
    res.json({
        message: "Rest API using Node"
    })
})

//port declaration
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});