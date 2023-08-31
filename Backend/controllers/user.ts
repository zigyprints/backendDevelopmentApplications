import {User} from "../models/user";
import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { sendError }  from '../utils/helper';
import * as dotenv from 'dotenv';
import { Password } from "../utils/classpassword";
dotenv.config();

export const create = async (req:Request, res:Response) => {
    const { name,email,password } = req.body;
    const olduser = await User.findOne({email});
    if(olduser) return res.status(401).json({error:'This email is already in use'})
  
    const newUser = new User({ name, email, password });
    await newUser.save();

  
    res.status(201).json({user:{
      id:newUser._id,
      name:newUser.name,
      email:newUser.email,
    }});
  };


  export const signIn = async(req:Request,res:Response,next:NextFunction)=>{
    const{email,password} = req.body;
    try{
     const user = await User.findOne({email})
     if(!user) return sendError(res,'Email/Password mismatch!');
  
     const matched = await Password.comparePassword(user.password,password);
     if(!matched) return sendError(res,'Email/Passwrod mismatch')
  
     const{_id, name} = user
     if(!process.env.JWT_SECRET) throw new Error("Jwt secret is unknown/NOT FOUND");
     const jwttoken = jwt.sign({userId:user._id},process.env.JWT_SECRET)
     res.json({user:{id:_id,name,email,token:jwttoken}});
    }
    catch(error){
    //  next(error.message);
   }
   }