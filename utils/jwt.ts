import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

// dot env configuring
dotenv.config();

// function for generating jwt token
export const generateToken = (payload: JwtPayload): String => {
  const token = jwt.sign(payload, process.env.SECRET as Secret, {
    expiresIn: "2days",
  });
  return token;
};
