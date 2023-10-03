import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";

export async function authenticateUser(req: Request, res: Response) {
  try {
    const userData: IUser = req.body;
    const user = new User(userData);
    await user.save();

    return res.status(201).json({ token: user.id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
