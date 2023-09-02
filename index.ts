import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Error } from "interfaces/error";
import router from "./router";

const app = express();

dotenv.config();
app.use(cors());

// connection to mongodb
async function connect() {
  try {
    const conn = await mongoose.connect(process.env.MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.use(express.json());
app.use('/', router());

//error handler 
app.use((err: Error, req: Request, res: Response, next: any) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Connected to Server");
});
