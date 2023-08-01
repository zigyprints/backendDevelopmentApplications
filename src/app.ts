import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

//paths
import connectDB from './config/dbConnection';
import todoRoutes from './routes/todoRoutes';

//creating express app
const app = express();

//configuring env
dotenv.config();

//middleware
app.use(cors());
app.use(bodyParser.json());

//Db connection
connectDB();

//test route
app.get('/', (req: Request, res: Response) =>{
    res.json({
        message: "Rest API using Node"
    })
})

// Routes
app.use('/api/v1/todos', todoRoutes);

//port declaration
const PORT = process.env.PORT || 8080;

//server running
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});