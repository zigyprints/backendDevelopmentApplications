import { Request, Response } from "express";
import { IUser } from "../models/User.js";
import GroupChat from "../models/GroupChat.js";
import GroupMessage from "../models/GroupMessage.js";
import { sendMessageNotification } from "../socket/groupMessage.socket.js";

export async function sendMessage(req: Request, res: Response) {
  try {
    const sender: IUser = req.user as IUser;
    const { groupId, text } = req.body;

    if (!groupId || !text) {
      return res.status(422).json({ message: "Unprocessable entity" });
    }

    const group = await GroupChat.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Not found" });
    }

    const message = new GroupMessage({
      sender: sender.id,
      group: group.id,
      text,
    });

    group.messages.push(message.id);

    await group.save();

    sendMessageNotification(group, sender, message, req);

    return res.status(201).json({ message: `Message ${message.id} is send` });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
