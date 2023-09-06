import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

// initializing app
const app: Express = express();
const port = process.env.PORT;

// configuring dotenv
dotenv.config();

// adding middle wares to app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// registering router
app.use("/api/v1", router);

// welcome api call
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to todo app API");
});

// listening to app
app.listen(port, () => {
  console.log(`Api is running at http://localhost:${port}`);
});
