import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to todo app API");
});

app.listen(port, () => {
  console.log(`Api is running at http://localhost:${port}`);
});
