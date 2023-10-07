const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {};

// Your WebSocket logic goes here
io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

// Serve your Express routes and static files here
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
