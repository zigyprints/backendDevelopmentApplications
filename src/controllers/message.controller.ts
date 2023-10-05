import { Request, Response } from "express";
import User from "../models/User.js";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import {
  sendMessageDeleteNotification,
  sendMessageNotification,
} from "../socket/message.socket.js";
import mongoose from "mongoose";
import { IUser } from "../models/User.js";

export async function createMessage(req: Request, res: Response) {
  try {
    const { chatId, receiverId, text } = req.body;
    const sender: IUser = req.user as IUser;

    if (!chatId || !text || !receiverId) {
      return res.status(422).json({ message: "Unprocessable entity" });
    }

    const receiver = await User.findById(receiverId);
    const chat = await Chat.findById(chatId);

    if (!receiver || !chat) {
      return res.status(404).json({ message: "Not found" });
    }

    const message = new Message({
      sender: sender.id,
      receiver: receiverId,
      chatId,
      text,
    });

    await message.save();

    chat.messages.push(message.id);
    await chat.save();

    await sendMessageNotification(
      new mongoose.Types.ObjectId(receiverId),
      message,
      req
    );

    return res
      .status(201)
      .json({ message: `Message is send to ${receiverId}` });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const sender: IUser = req.user as IUser;
    const { chatId, messageId } = req.query;

    if (!chatId || !messageId) {
      return res.status(422).json({ message: "Unprocessable entity" });
    }

    const chat = await Chat.findById(chatId);
    const message = await Message.findById(messageId);

    if (!message || !chat) {
      return res.status(404).json({ message: "Not found" });
    }

    const receiverId: string = chat.participants
      .find((id) => id.toString().localeCompare(sender.id) != 0)
      ?.toString() as string;

    chat.messages = chat.messages.filter(
      (id) => id.toString().localeCompare(messageId.toString()) != 0
    );
    await chat.save();
    await message.deleteOne();

    sendMessageDeleteNotification(
      new mongoose.Types.ObjectId(receiverId),
      new mongoose.Types.ObjectId(messageId.toString()),
      req
    );

    return res.status(200).json({ message: `Message ${messageId} is deleted` });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
