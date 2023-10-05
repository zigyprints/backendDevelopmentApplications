import jwt, { JwtPayload } from "jsonwebtoken";

export function generateToken(data: JwtPayload) {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET as string);
    return token;
  } catch (error) {
    throw error;
  }
}

export function decodeToken(token: string) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return data;
  } catch (error) {
    throw error;
  }
}
