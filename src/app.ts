import express, { Request, Response } from "express";
import dotenv from "dotenv";

const app = express();

//configuring env
dotenv.config();

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