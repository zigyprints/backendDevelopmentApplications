import mongoose from "mongoose";

const Connection = () => {
  try {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable not defined");
    }

    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
};

export default Connection;
