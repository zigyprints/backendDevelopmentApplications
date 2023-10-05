import { Request } from "express";
import Chat, { IChat } from "../models/Chat.js";
import User, { IUser } from "../models/User.js";
import { Server } from "socket.io";
import { SocketEvent } from "./events.js";
import mongoose from "mongoose";

type ChatDetails = {
  sender: mongoose.Document;
  receiverId: mongoose.Types.ObjectId | undefined;
};

async function getChatDetails(
  senderId: string,
  chatId: string
): Promise<ChatDetails> {
  try {
    const chat: IChat | undefined = (await Chat.findById(chatId)) as
      | IChat
      | undefined;

    if (!chat) {
      throw new Error(`No chats found for id: ${chatId}`);
    }

    const receiverId: mongoose.Types.ObjectId | undefined =
      chat.participants.find(
        (e: mongoose.Types.ObjectId) =>
          e.toString().localeCompare(senderId) != 0
      );

    const sender: IUser = (await User.findById(senderId)) as IUser;

    return {
      receiverId,
      sender,
    };
  } catch (error) {
    throw error;
  }
}

export async function sendChatInvitation(
  senderId: string,
  chatId: string,
  req: Request
) {
  try {
    const { sender, receiverId }: ChatDetails = await getChatDetails(
      senderId,
      chatId
    );

    const socket: Server = req.app.get("io");

    receiverId &&
      socket.in(receiverId?.toString()).emit(SocketEvent.INVITATION, sender);
  } catch (error) {
    throw error;
  }
}

export async function sendChatDeleteNotification(
  senderId: string,
  chatId: string,
  req: Request
) {
  try {
    const { receiverId }: ChatDetails = await getChatDetails(senderId, chatId);

    const socket: Server = req.app.get("io");

    receiverId &&
      socket.in(receiverId?.toString()).emit(SocketEvent.DELETE_CHAT, chatId);
  } catch (error) {
    throw error;
  }
}
