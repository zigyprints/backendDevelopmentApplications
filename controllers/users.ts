import { Request, Response } from "express";
import { User } from "../models";
import { generateToken } from "../utils/jwt";

// register controller
export const register = async (req: Request, res: Response) => {
  try {
    // destructuring req body
    const { name, email, password } = req.body;

    // checking if user already exist
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User with this email already exist" });

    // creatim=ng new user
    const user = await User.create({ name, email, password });

    // generating jwt token
    const token = generateToken({ email: user.email, id: user.id });

    // returning user details and token
    return res.status(200).json({
      user: { email: user.email, name: user.name },
      token,
      message: "user registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "some internal error occur" });
  }
};

// login controller
export const login = async (req: Request, res: Response) => {
  try {
    // destructuring req body
    const { email, password } = req.body;

    // finding user with email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    // checking whether password matches or not
    if (user.password !== password)
      return res
        .status(400)
        .json({ message: "The password doesn't match with the email" });

    // generating token
    const token = generateToken({ email: user.email, id: user.id });

    // returning user details and token
    return res.status(200).json({
      user: { email: user.email, name: user.name },
      token,
      message: "user logged in",
    });
  } catch (error) {
    return res.status(500).json({ message: "some internal error occur" });
  }
};
