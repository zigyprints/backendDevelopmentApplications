import "express-async-errors";
import express, { Express, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

/**
 * Map of usernames to socket IDs.
 * @type {Map<string, string>}
 */
const users: Map<string, string> = new Map();

/**
 * Map of room names to room admins' usernames.
 * @type {Map<string, string>}
 */
const roomAdmins: Map<string, string> = new Map();

/**
 * Object containing room members where each key is a room name and the value is an array of usernames.
 * @type {{ [roomName: string]: string[] }}
 */
const roomMembers: { [roomName: string]: string[] } = {};

/**
 * Object containing messages for each room where each key is a room name, and the value is an array of messages.
 * @type {{ [roomName: string]: { sender: string; content: string }[] }}
 */
const messages: { [roomName: string]: { sender: string; content: string }[] } =
    {};

/**
 * Handles and emits an error message to a socket.
 * @param {Socket} socket - The Socket object to which the error should be emitted.
 * @param {string} event - The name of the event that caused the error.
 * @param {string} msg - The error message to be sent.
 */
const errorHandler = (socket: Socket, event: string, msg: string) => {
    socket.emit("error_status", {
        success: false,
        event: event,
        msg: msg,
    });
};

/**
 * Handles the socket connection and various socket events.
 * @param {Socket} socket - The Socket object representing the client connection.
 */
io.on("connection", (socket: Socket) => {
    console.log("connected");

    /**
     * Handles a client's request to join the server.
     * @param {string} username - The username to be associated with the client.
     */
    socket.on("join_server", (username: string) => {
        if (username === "") {
            errorHandler(
                socket,
                "join_server",
                "The username is invalid. Please select a different one."
            );
        } else if (users.has(username)) {
            errorHandler(
                socket,
                "join_server",
                "The username is already in use! Please choose a different username."
            );
        } else {
            users.set(username, socket.id);
            const rooms: string[] = Array.from(roomAdmins.keys());
            socket.emit("server_joined", {
                success: true,
                msg: "Welcome to the server!",
                rooms: rooms,
            });
        }
    });

    /**
     * Handles a request to create a new room and adds the user as the room admin.
     * @param {string} username - The username of the user creating the room.
     * @param {string} roomName - The name of the room to be created.
     */
    socket.on("create_room", (username: string, roomName: string) => {
        if (roomAdmins.has(roomName)) {
            errorHandler(
                socket,
                "create_room",
                "The room name is already in use! Please choose a different room name."
            );
        } else {
            // Add the room admin to roomAdmins map
            roomAdmins.set(roomName, username);

            // Initialize roomMembers and messages for the new room
            roomMembers[roomName] = [];
            messages[roomName] = [];

            // Add the room admin to roomMembers
            roomMembers[roomName].push(username);

            // Join the room
            socket.join(roomName);

            // Emit room_created event to all clients
            io.emit("room_created", {
                success: true,
                msg: "Room created Successfully",
                roomName: roomName,
            });

            // Emit room_joined event to clients in the room
            io.to(roomName).emit("room_joined", {
                success: true,
                msg: `${username} has joined the room.`,
                roomMembers: roomMembers[roomName],
                messages: messages[roomName],
            });
        }
    });

    /**
     * Handles a request to delete a room, if the user is the room admin.
     * @param {string} username - The username of the user making the request.
     * @param {string} roomName - The name of the room to be deleted.
     */
    socket.on("delete_room", (username: string, roomName: string) => {
        if (roomAdmins.get(roomName) !== username) {
            errorHandler(
                socket,
                "delete_room",
                "You are not authorized to delete the room."
            );
        } else {
            const room: Set<string> | undefined =
                io.sockets.adapter.rooms.get(roomName);
            if (room) {
                // Remove room information
                delete roomMembers[roomName];
                delete messages[roomName];
                roomAdmins.delete(roomName);

                // Make all clients leave the room
                for (const socketId of room) {
                    io.sockets.sockets.get(socketId)?.leave(roomName);
                }
            }
            // Emit a room_deleted event to all clients
            io.emit("room_deleted", {
                success: true,
                msg: `${roomName} room deleted`,
                roomName: roomName,
            });
        }
    });

    /**
     * Handles a request for a user to join a room.
     * @param {string} username - The username of the user making the request.
     * @param {string} roomName - The name of the room to join.
     */
    socket.on("join_room", (username: string, roomName: string) => {
        if (!roomAdmins.has(roomName)) {
            errorHandler(
                socket,
                "join_room",
                "Invalid Room Name! Please choose a different room."
            );
        } else if (roomMembers[roomName].includes(username)) {
            errorHandler(
                socket,
                "join_room",
                "You are already a member of this room!"
            );
        } else {
            // Add the user to the roomMembers list and join the room
            roomMembers[roomName].push(username);
            socket.join(roomName);

            // Emit a room_joined event to all clients in the room
            io.to(roomName).emit("room_joined", {
                success: true,
                msg: `${username} has joined the room.`,
                roomMembers: roomMembers[roomName],
                messages: messages[roomName],
            });
        }
    });

    /**
     * Handles a request for a user to leave a room.
     * @param {string} username - The username of the user making the request.
     * @param {string} roomName - The name of the room to leave.
     */
    socket.on("leave_room", (username: string, roomName: string) => {
        if (!roomAdmins.has(roomName)) {
            errorHandler(
                socket,
                "leave_room",
                "Invalid Room Name! Please choose a different room."
            );
        } else if (!roomMembers[roomName].includes(username)) {
            errorHandler(
                socket,
                "leave_room",
                "You are not a member of this room!"
            );
        } else {
            // Remove the user from the roomMembers list and make them leave the room
            roomMembers[roomName].splice(
                roomMembers[roomName].indexOf(username),
                1
            );
            socket.leave(roomName);

            // Emit a room_left event to all clients in the room
            io.to(roomName).emit("room_left", {
                success: true,
                msg: `${username} left the room.`,
                roomMembers: roomMembers[roomName],
            });
        }
    });

    /**
     * Handles a request to send a message in a room.
     * @param {string} username - The username of the user sending the message.
     * @param {string} roomName - The name of the room where the message is sent.
     * @param {string} content - The content of the message.
     */
    socket.on(
        "send_message",
        (username: string, roomName: string, content: string) => {
            if (!messages[roomName]) {
                errorHandler(
                    socket,
                    "send_message",
                    "Invalid Room Name! Please choose a different room."
                );
            } else if (!roomMembers[roomName].includes(username)) {
                errorHandler(
                    socket,
                    "send_message",
                    "You are not a member of this room!"
                );
            } else {
                // Create a payload with message content and sender
                const payload = {
                    content: content,
                    sender: username,
                };

                // Emit a new_message event to all clients in the room
                socket.broadcast.to(roomName).emit("new_message", {
                    success: true,
                    roomName: roomName,
                    ...payload,
                });

                // Add the message to the room's message history
                messages[roomName].push(payload);
            }
        }
    );

    /**
     * Handles the socket disconnecting event.
     */
    socket.on("disconnecting", () => {
        let username: string | undefined;

        // Gets the username of the disconnecting user from the mapping and deletes the user.
        for (const [key, value] of users.entries()) {
            if (value === socket.id) {
                username = key;
                users.delete(key);
                break;
            }
        }

        // Remove the user from all the rooms they joined
        socket.rooms.forEach((roomName) => {
            if (roomName !== socket.id) {
                socket.leave(roomName);

                if (username && roomMembers[roomName]) {
                    roomMembers[roomName].splice(
                        roomMembers[roomName].indexOf(username),
                        1
                    );

                    // Send a room_left message to the room
                    io.to(roomName).emit("room_left", {
                        success: true,
                        msg: `${username} left the room.`,
                        roomMembers: roomMembers[roomName],
                    });
                }
            }
        });
    });

    /**
     * Handles the socket disconnect event.
     */
    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});

/**
 * Express middleware to handle errors asynchronously.
 * @param {Error} err - The error object.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {Function} next - The next function to call.
 */
app.use((err: Error, req: Request, res: Response, next: Function) => {
    // Handle errors here
    console.error(err);
    res.status(500).send("Internal Server Error");
});

/**
 * Start the HTTP server and listen on a specified port.
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - A callback function to execute when the server starts listening.
 *
 */
server.listen(8080, () => {
    console.log("Server is listening on port: 8080");
});
