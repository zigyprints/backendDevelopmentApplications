import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/todo.route";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection 
const monogoURL =
  `${process.env.MONGODB_URL}` || "mongodb://localhost:27017/todo-app";
function connection() {
  try {
    mongoose.connect(monogoURL);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log(error);
  }
}

//Welcome Message
app.get("/", (req, res) => {
  res.status(201).json({ msg: "Welcome To Todo API" });
});

// Define Routes
app.use("/todo", router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connection();
  console.log(`Server is running on port ${PORT}`);
});
