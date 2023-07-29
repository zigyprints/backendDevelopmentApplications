import mongoose from "mongoose";

const url =
  process.env.DATABASE_URL ||
  "mongodb+srv://myUser:1234@cluster0.wk0dk.mongodb.net/myTasks?retryWrites=true&w=majority";
const Connection = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(url);
    console.log("Connected to Database");
  } catch (err) {
    console.log("Error connecting to MongoDB Atlas", err);
  }
};

export default Connection;