const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

const users = {};
const rooms = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = { name, socket };
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("join-room", (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].users.push(socket.id);
      socket.join(roomId);
      socket.emit("room-joined", roomId);
    }
  });

  socket.on("send-chat-message", ({ message, roomId }) => {
    if (rooms[roomId]) {
      const senderName = users[socket.id].name;
      const chatMessage = { message, senderName };
      rooms[roomId].messages.push(chatMessage);
      io.to(roomId).emit("chat-message", chatMessage);
    }
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const userName = user.name;
      socket.broadcast.emit("user-disconnected", userName);

      // Remove the user from all rooms they were in
      Object.keys(rooms).forEach((roomId) => {
        if (rooms[roomId].users.includes(socket.id)) {
          rooms[roomId].users = rooms[roomId].users.filter(
            (id) => id !== socket.id
          );
        }
      });

      delete users[socket.id];
    }
  });
});

app.post("/create-room", (req, res) => {
  const { roomName } = req.body;
  const roomId = Date.now().toString(); // Generate a unique room ID
  rooms[roomId] = { name: roomName, users: [], messages: [] };
  res.json({ success: true, roomId });
});

app.get("/get-rooms", (req, res) => {
  const roomList = Object.keys(rooms).map((roomId) => ({
    id: roomId,
    name: rooms[roomId].name,
    userCount: rooms[roomId].users.length,
  }));
  res.json({ success: true, rooms: roomList });
});

app.get("/get-messages/:roomId", (req, res) => {
  const { roomId } = req.params;
  if (rooms[roomId]) {
    const messages = rooms[roomId].messages;
    res.json({ success: true, messages });
  } else {
    res.status(404).json({ success: false, message: "Room not found" });
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
