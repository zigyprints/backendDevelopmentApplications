import express, { Request, Response } from "express";

const app = express();
const PORT = 8080;

//test route
app.get('/', (req: Request, res: Response) =>{
    res.json({
        message: "Rest API using Node"
    })
})

//server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});