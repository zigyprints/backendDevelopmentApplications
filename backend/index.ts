const { getUsers } = require("./utils/users");
const { userJoin } = require("./utils/users");
const { getRooms } = require("./utils/rooms");
const { roomJoin } = require("./utils/rooms");
const { leaveRoom } = require("./utils/rooms");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    // origin: "http://locahost:3000",
    methods: ["GET", "POST"],
  },
});

interface messageProps {
  username: string;
  message: string;
  room: string;
}

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data: string) => {
    if (!roomJoin(data, socket.id)) {
      socket.emit("username", `User already joined the room`);
    } else {
      socket.join(data);
      socket.emit("username", `User joined the room`);
      console.log(getRooms());
    }

    console.log(data, "room");
  });

  socket.on("add_user", (username: string) => {
    if (!userJoin(socket.id, username)) {
      socket.emit("username", `Username ${username} already exists`);
    } else {
      socket.emit("username", `Username ${username} submitted successfully`);
      console.log(getUsers());
    }
  });

  socket.on("send_message", (data: messageProps) => {
    // socket.broadcast.emit("receive_message", data);
    socket.broadcast.to(data.room).emit("receive_message", data.message);
    console.log(typeof data.room, data.message);
  });

  socket.on("leave_room", (data: string) => {
    console.log("dis", data);

    if (leaveRoom(socket.id, data)) {
      socket.broadcast
        .to(data)
        .emit("receive_message", "A user has left the chat");
      socket.leave(data);
    } else {
      console.log(
        "You cannot leave because you did not joined the room before"
      );
    }
  });
});

server.listen(5000, () => console.log("Server started on PORT 5000"));
