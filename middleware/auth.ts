import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // getting token from request
    const token = req.headers?.authorization?.split(" ")[1];

    // checking if token is present or not
    if (!token) throw new Error();

    // verifying token
    const decode = verifyToken(token);

    // sending token payload to next function request
    req.body.token = decode;
    next();
  } catch (error) {
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    return res.status(401).json({ message: "unauthorized reqeuest" });
  }
};

module.exports = { authMiddleware };
