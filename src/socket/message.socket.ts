import { Request } from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { SocketEvent } from "./events.js";

export async function sendMessageNotification(
  receiverId: mongoose.Types.ObjectId,
  message: mongoose.Document,
  req: Request
) {
  try {
    const socket: Server = req.app.get("io");
    if (!socket) throw new Error("Internal socket error");

    socket.in(receiverId.toString()).emit(SocketEvent.MESSAGE, message);
  } catch (error) {
    throw error;
  }
}

export async function sendMessageDeleteNotification(
  receiverId: mongoose.Types.ObjectId,
  messageId: mongoose.Types.ObjectId,
  req: Request
) {
  try {
    const socket: Server = req.app.get("io");
    if (!socket) throw new Error("Internal socket error");

    socket
      .in(receiverId.toString())
      .emit(SocketEvent.MESSAGE_DELETED, { messageId: messageId });
  } catch (error) {
    throw error;
  }
}
