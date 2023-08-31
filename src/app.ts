import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
console.log(process.env.DB_URl);
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ToDo } from "./models/todo";

const app: Express = express();

const dbUrl: string = process.env.DB_URL || "";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((e: Error) => {
    console.log(e);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the ToDo API");
});

const port: number = parseInt(process.env.PORT || "3000");

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
