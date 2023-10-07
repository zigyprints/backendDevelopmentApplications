const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

const users = {};
const rooms = {};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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
    } else {
      socket.emit("room-not-found", "Room not found");
    }
  });

  socket.on("send-chat-message", async ({ message, roomId, imageData }) => {
    if (rooms[roomId]) {
      const senderName = users[socket.id].name;
      const chatMessage = { message, senderName };

      if (imageData) {
        const imageFileName = imageData.filename;
        const imageSrc = `/uploads/${imageFileName}`;
        chatMessage.image = imageSrc;
        io.to(roomId).emit("chat-message", chatMessage);
      } else {
        rooms[roomId].messages.push(chatMessage);
        io.to(roomId).emit("chat-message", chatMessage);
      }
    } else {
      socket.emit("room-not-found", "Room not found");
    }
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const userName = user.name;
      socket.broadcast.emit("user-disconnected", userName);

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
  const roomId = Date.now().toString();
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

app.post("/upload-image", upload.single("image"), (req, res) => {
  if (req.file) {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } else {
    res.status(400).json({ success: false, message: "Image upload failed" });
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
