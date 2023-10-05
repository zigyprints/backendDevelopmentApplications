import { Request, Response } from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export async function signUp(req: Request, res: Response) {
  try {
    const { displayName, email, photoUrl, password } = req.body;

    if (!displayName || !email || !photoUrl || !password) {
      return res.status(422).json({ message: "Unprocessable Entity" });
    }

    const user = new User({ displayName, email, photoUrl, password });

    await user.save();

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Unprocessable Entity" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const token = generateToken(user.id);

    res.cookie("auth", token, { httpOnly: true });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export async function logout(_req: Request, res: Response) {
  try {
    res.clearCookie("auth");
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
}
