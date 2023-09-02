import jwt from "jsonwebtoken";
import express from 'express';
import User from "../models/User";
import { MyRequest } from "../interfaces/myrequest";
import { Document } from 'mongoose'; 
import { MyObjectType } from "../types/objecttype";

type VerifyTokenResult = {
    err: Error | null;
    user: string | jwt.JwtPayload ;
};
  
export const verifyToken = (req: MyRequest, res: express.Response, next: any) => {
    const authHeader = req.headers.token as string;
    if (authHeader) {
        const token = authHeader.split(" ")[0] as string;
        const result = jwt.verify(token, process.env.JWT) as VerifyTokenResult;
        console.log(result);
        if (result.err) {
            res.status(403).json("Token is not valid!");
        } else {
            req.user = result;
            console.log(req.user);
            next();
        }
        jwt.verify(token, process.env.JWT, (err, user : MyObjectType) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
          });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

