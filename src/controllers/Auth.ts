import mongoose from "mongoose";
import express from 'express';
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MyError from "../error";

export const signup = async (req : express.Request, res : express.Response , next : any) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req : express.Request, res : express.Response , next : any) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(!user) return next(new MyError(404, "User not found!"));
    
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(new MyError(400, "Wrong Credentials!"));
 
    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    res.status(200).json({token,...others});

  } catch (error) {
    next(error);
  }
};