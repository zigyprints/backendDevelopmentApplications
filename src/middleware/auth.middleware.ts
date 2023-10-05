import { NextFunction, Response } from "express";
import User from "../models/User.js";
import { decodeToken } from "../utils/jwt.js";

export default async function authMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string = req.cookies?.auth as string;
    const user = await User.findById(decodeToken(token));

    if (!user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
}
