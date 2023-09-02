import express, { Application } from "express";
import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import errorHandler from "./middleware/error";
import tasks from "./routes/tasks";

dotenv.config();

const app: Application = express();

mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

mongoose.connection.on("connected", () => {
  console.log(`MongoDB Connected`.cyan.underline.bold);
});

app.use(express.json());

app.use(errorHandler);

app.use("/tasks", tasks);

app.get("/", (req, res) => {
  res.send("Welcome to the TodoList API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  const message = `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`;
  console.log(colors.yellow.bold(message));
});
