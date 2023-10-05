import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { createServer } from "http";
import cookieParser from "cookie-parser";

import AuthRoute from "./routes/user.route.js";
import ChatRoute from "./routes/chat.route.js";
import MessageRoute from "./routes/message.route.js";
import GroupChatRoute from "./routes/groupChat.route.js";
import GroupMessageRoute from "./routes/groupMessage.route.js";
import ImageRoute from "./routes/image.route.js";

import initializeSocket from "./socket/initializeSocket.js";
import { IUser } from "./models/User.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app: Express = express();
const PORT: number = 3000;

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

app.use(express.static("../uploads"));
app.use(express.json());
app.use(cookieParser());
app.set("root_dir", __dirname);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
});

app.set("io", io);
initializeSocket(io);

mongoose.connect(
  process.env.DATABASE_URL as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", AuthRoute);
app.use("/api/chat", ChatRoute);
app.use("/api/message", MessageRoute);
app.use("/api/group_chat", GroupChatRoute);
app.use("/api/group_message", GroupMessageRoute);
app.use("/api/image", ImageRoute);
