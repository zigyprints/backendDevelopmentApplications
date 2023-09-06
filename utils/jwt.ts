import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

// dot env configuring
dotenv.config();

const secret = process.env.SECRET as Secret;

// function for generating jwt token
export const generateToken = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "2days",
  });
  return token;
};

// function for decoding jwt token
export const verifyToken = (token: string): JwtPayload => {
  let decode = {};
  if (token) decode = jwt.verify(token, secret);
  return decode;
};
