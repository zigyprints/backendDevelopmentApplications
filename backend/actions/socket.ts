import { Socket } from "socket.io";
import { Message } from "types";

// Import functions for managing rooms and users
import { getRooms, leaveRoom, roomJoin } from "../utils/rooms";
import { getUser, getUsers, userJoin } from "../utils/users";

/**
 * Handles a new socket connection and sets up event listeners.
 * @param {Socket} socket - The Socket.IO socket representing the connection.
 */
export const handleSocketConnection = (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Handle 'join_room' event
  socket.on("join_room", (room: string) => {
    handleJoinRoom(socket, room);
  });

  // Handle 'add_user' event
  socket.on("add_user", (username: string) => {
    handleAddUser(socket, username);
  });

  // Handle 'send_message' event
  socket.on("send_message", (params: Message) => {
    handleSendMessage(socket, params);
  });

  // Handle 'leave_room' event
  socket.on("leave_room", (room: string) => {
    handleLeaveRoom(socket, room);
  });
};

/**
 * Handles the 'join_room' event, allowing a user to join a room.
 * @param {Socket} socket - The Socket.IO socket representing the connection.
 * @param {string} room - The name of the room to join.
 */
const handleJoinRoom = (socket: Socket, room: string) => {
  if (!roomJoin(room, socket.id)) {
    // Notify the user that they have already joined the room
    socket.emit("username", "User already joined the room");
  } else {
    // Join the room and notify the user
    socket.join(room);
    socket.emit("username", "User joined the room");
    console.log(getRooms());
  }
};

/**
 * Handles the 'add_user' event, allowing a user to join with a username.
 * @param {Socket} socket - The Socket.IO socket representing the connection.
 * @param {string} username - The username to be assigned to the user.
 */
const handleAddUser = (socket: Socket, username: string) => {
  if (!userJoin(socket.id, username)) {
    // Notify the user that the chosen username is already taken
    socket.emit("username", `Username ${username} already taken`);

    // console.log(getUsers());
  } else {
    // Notify the user that their username has been submitted successfully
    socket.emit("username", `Username ${username} submitted successfully`);
    console.log(getUsers());
  }
};

/**
 * Handles the 'send_message' event, allowing a user to send a message or image to a room.
 * @param {Socket} socket - The Socket.IO socket representing the connection.
 * @param {Message} params - The message parameters, including message content, image, and room.
 */
const handleSendMessage = (socket: Socket, params: Message) => {
  const { message, img, room } = params;

  let username: string | undefined = getUser(socket.id);
  if (!username) username = socket.id;

  if (!message && !img) {
    // Log an error if no message or image is provided
    console.error("Please send any message or image");
  } else if (!message) {
    // Broadcast the image to the room
    socket.broadcast.to(room).emit("receive_image", { username, img });
  } else {
    // Broadcast the message to the room
    socket.broadcast.to(room).emit("receive_message", { username, message });
  }
};

/**
 * Handles the 'leave_room' event, allowing a user to leave a room.
 * @param {Socket} socket - The Socket.IO socket representing the connection.
 * @param {string} room - The name of the room to leave.
 */
const handleLeaveRoom = (socket: Socket, room: string) => {
  // Broadcast a message to the room when a user leaves
  if (leaveRoom(socket.id, room)) {
    let username: string | undefined = getUser(socket.id);
    if (!username) username = socket.id;

    socket.broadcast
      .to(room)
      .emit("receive_message", `${username} has left the chat`);
    socket.leave(room);

    console.log(getRooms());
  } else {
    console.error("You cannot leave because you did not join the room before");
  }
};
