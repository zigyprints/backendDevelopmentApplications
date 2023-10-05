import { Request, Response } from "express";
import GroupChat, { IGroupChat } from "../models/GroupChat.js";
import { IUser } from "../models/User.js";
import { sendNewParticipantNotification } from "../socket/groupChat.socket.js";

export async function getGroups(req: Request, res: Response) {
  try {
    const sender: IUser = req.user as IUser;
    const groups = await GroupChat.find({});

    const otherGroups = groups.filter(
      (group) => group.id.localeCompare(sender.id) != 0
    );

    return res.status(201).json({ groups: otherGroups });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createGroup(req: Request, res: Response) {
  try {
    const sender: IUser = req.user as IUser;
    const { name } = req.body;

    if (!name) {
      return res.status(422).json({ message: "Unprocessable entity" });
    }

    const group = new GroupChat({
      name,
      author: sender.id,
      participants: [sender.id],
    });

    await group.save();

    return res.status(201).json({ group });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function joinGroup(req: Request, res: Response) {
  try {
    const sender: IUser = req.user as IUser;
    const { groupId } = req.body;

    if (!groupId) {
      return res.status(422).json({ message: "Unprocessable entity" });
    }

    const group: IGroupChat = (await GroupChat.findById(groupId)) as IGroupChat;

    if (!group) {
      return res.status(404).json({ message: "Group Not found" });
    }

    group.participants.push(sender.id);
    await group.save();

    sendNewParticipantNotification(group, sender, req);

    return res.status(200).json({ group });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
