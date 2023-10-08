"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(body_parser_1.default.json());
const users = {};
const rooms = {};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
io.on('connection', (socket) => {
    socket.on('new-user', (name) => {
        users[socket.id] = { name, socket };
        socket.broadcast.emit('user-connected', name);
    });
    socket.on('join-room', (roomId) => {
        if (rooms[roomId]) {
            rooms[roomId].users.push(socket.id);
            socket.join(roomId);
            socket.emit('room-joined', roomId);
        }
        else {
            socket.emit('room-not-found', 'Room not found');
        }
    });
    socket.on('send-chat-message', ({ message, roomId, imageData }) => __awaiter(void 0, void 0, void 0, function* () {
        if (rooms[roomId]) {
            const senderName = users[socket.id].name;
            let chatMessage;
            if (imageData) {
                const imageFileName = imageData.filename;
                const imageSrc = `/uploads/${imageFileName}`;
                chatMessage = { message, senderName, image: imageSrc };
                io.to(roomId).emit('chat-message', chatMessage);
            }
            else {
                chatMessage = { message, senderName };
                rooms[roomId].messages.push(chatMessage);
                io.to(roomId).emit('chat-message', chatMessage);
            }
        }
        else {
            socket.emit('room-not-found', 'Room not found');
        }
    }));
    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            const userName = user.name;
            socket.broadcast.emit('user-disconnected', userName);
            Object.keys(rooms).forEach((roomId) => {
                if (rooms[roomId].users.includes(socket.id)) {
                    rooms[roomId].users = rooms[roomId].users.filter((id) => id !== socket.id);
                }
            });
            delete users[socket.id];
        }
    });
});
app.post('/create-room', (req, res) => {
    const { roomName } = req.body;
    const roomId = Date.now().toString();
    rooms[roomId] = { name: roomName, users: [], messages: [] };
    res.json({ success: true, roomId });
});
app.get('/get-rooms', (req, res) => {
    const roomList = Object.keys(rooms).map((roomId) => ({
        id: roomId,
        name: rooms[roomId].name,
        userCount: rooms[roomId].users.length,
    }));
    res.json({ success: true, rooms: roomList });
});
app.get('/get-messages/:roomId', (req, res) => {
    const { roomId } = req.params;
    if (rooms[roomId]) {
        const messages = rooms[roomId].messages;
        res.json({ success: true, messages });
    }
    else {
        res.status(404).json({ success: false, message: 'Room not found' });
    }
});
app.post('/upload-image', upload.single('image'), (req, res) => {
    if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ success: true, imageUrl });
    }
    else {
        res.status(400).json({ success: false, message: 'Image upload failed' });
    }
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
