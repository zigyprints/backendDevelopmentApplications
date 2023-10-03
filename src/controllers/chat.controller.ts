import { Request, Response } from "express";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

export async function createChat(req: Request, res: Response) {
  try {
    const receiverId: string = req.body.reciever_id;
    const senderId: string | undefined = req.headers.authorization;

    if (!senderId) {
      return res.status(403).json({ message: "Forbidden: no authorization" });
    }

    if (!receiverId || receiverId.localeCompare(senderId) == 0) {
      return res.status(422).json({ message: "Unprocessable entity" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (
      await Chat.exists({
        participants: {
          $all: [senderId, receiverId],
        },
      })
    ) {
      return res.status(200).json({ message: "Chat already exists" });
    }

    const chat = new Chat({
      participants: [senderId, receiverId],
      author: senderId,
    });

    await chat.save();

    return res.status(201).json({ chatId: chat.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteChat(req: Request, res: Response) {
  try {
    const chatId: string | undefined = req.query.chatId as string | undefined;
    const senderId: string | undefined = req.headers.authorization;

    if (!chatId) {
      return res.status(403).json({ message: "Unprocessable entity" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!senderId || chat.author.toString().localeCompare(senderId) !== 0) {
      return res.status(403).json({ message: "no authorization" });
    }

    await Chat.deleteOne({ id: chatId });

    return res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server error" });
  }
}
