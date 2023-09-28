import { Request, Response} from "express";
import { app } from "../app.js";
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import chatRooms from "../chatRooms.js";

const chatRoom = (req: Request, res: Response) => {
    const roomname = req.params.roomname;
    const roomObj = chatRooms.find(chatroom => chatroom.name == roomname);
    io.on("connection", (socket) => {
        socket.join(roomname);

        socket.on("user-joined", (username) => {
            if (roomObj) {
                roomObj.users.push(username);
                io.to(roomname).emit('onlineUsers', roomObj.users);
            }
        });

        socket.on('chat-message', (message) => {
            socket.broadcast.to(roomname).emit(message);
        });

        socket.on('disconnect', (username) => {
            socket.leave(roomname);
            if (roomObj) {
                roomObj?.users.filter(user => user != username);
                io.to(roomname).emit('onlineUsers', roomObj.users);
            }

        });
    });
};

export default chatRoom;