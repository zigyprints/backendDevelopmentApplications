import { Router, Response, Request } from "express";
import User, { IUser } from "../models/User.js";

const router = Router();

router.post("/auth", async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;
    const user = new User(userData);
    user.save();

    res.cookie("token", user.id, {
      httpOnly: true,
    });

    return res.status(201).json({ message: "User authenticated" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router