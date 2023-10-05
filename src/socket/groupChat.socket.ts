import mongoose from "mongoose";
import { IGroupChat } from "../models/GroupChat.js";
import { IUser } from "../models/User.js";
import { Request } from "express";
import { Server } from "socket.io";
import { SocketEvent } from "./events.js";

export async function sendNewParticipantNotification(
  group: IGroupChat,
  sender: IUser,
  req: Request
) {
  try {
    const receivers: mongoose.Types.ObjectId[] = group.participants.filter(
      (id) => !id.equals(sender.id)
    );
    const socket: Server = req.app.get("io");

    if (!socket) throw new Error("Internal socket issue");

    receivers.forEach((rec) => {
      socket.in(rec.toString()).emit(SocketEvent.MESSAGE, sender);
    });
  } catch (error) {
    throw error;
  }
}
