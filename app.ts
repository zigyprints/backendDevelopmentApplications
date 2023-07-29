import express from "express";
import connectDB from "./database/connection";
import Routes from './routes/router';
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
var PORT = process.env.PORT || 5000;

// Using cors
app.use(cors());

// Connecting Database
connectDB();

//Declaring Routes
app.use("/", Routes);

// Misc
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 10000 }));

// Server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});