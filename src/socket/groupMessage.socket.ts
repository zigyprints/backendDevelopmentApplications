import { Request } from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { IGroupChat } from "../models/GroupChat.js";
import { IGroupMessage } from "../models/GroupMessage.js";
import { IUser } from "../models/User.js";
import { SocketEvent } from "./events.js";

export async function sendMessageNotification(
  group: IGroupChat,
  sender: IUser,
  message: IGroupMessage,
  req: Request
) {
  try {
    const receivers: mongoose.Types.ObjectId[] = group.participants.filter(
      (id) => !id.equals(sender.id)
    );
    const socket: Server = req.app.get("io");

    if (!socket) throw new Error("Internal socket issue");

    receivers.forEach((rec) => {
      socket.in(rec.toString()).emit(SocketEvent.PARTICIPANT_ADDED, message);
    });
  } catch (error) {
    throw error;
  }
}
