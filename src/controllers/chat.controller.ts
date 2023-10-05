import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import Chat from "../models/Chat.js";
import {
  sendChatDeleteNotification,
  sendChatInvitation,
} from "../socket/chat.socket.js";
import mongoose from "mongoose";

export async function getAllParticipants(req: Request, res: Response) {
  try {
    const sender: mongoose.Document = req.user;
    const users: mongoose.Document[] = await User.find({});

    const participants = users.filter(
      (user) => sender.id.localeCompare(user.id) != 0
    );

    return res.status(200).json({ participants });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createChat(req: Request, res: Response) {
  try {
    const receiverId: string = req.body.receiver_id;
    const sender: IUser = req.user as IUser;

    if (!receiverId || receiverId.localeCompare(sender.id) == 0) {
      return res.status(422).json({ message: "Unprocessable entity" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (
      await Chat.exists({
        participants: {
          $all: [sender.id, receiverId],
        },
      })
    ) {
      return res.status(200).json({ message: "Chat already exists" });
    }

    const chat = new Chat({
      participants: [sender.id, receiverId],
      author: sender.id,
    });

    await chat.save();

    await sendChatInvitation(sender.id, chat.id, req);

    return res.status(201).json({ chat });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteChat(req: Request, res: Response) {
  try {
    const chatId: string | undefined = req.query.chatId as string | undefined;
    const sender: IUser = req.user as IUser;

    if (!chatId) {
      return res.status(403).json({ message: "Unprocessable entity" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!sender.id || chat.author.toString().localeCompare(sender.id) !== 0) {
      return res.status(403).json({ message: "no authorization" });
    }

    await Chat.deleteOne({ id: chatId });

    await sendChatDeleteNotification(sender.id, chatId, req);

    return res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server error" });
  }
}
