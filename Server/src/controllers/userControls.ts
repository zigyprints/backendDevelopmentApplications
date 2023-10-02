import userModel from "../modals/userModel.js";
import {Request,Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Generating salt
const bcryptsalt = await bcrypt.genSaltSync(10)

function createToken(_id){
    const jwtkey:string = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, {expiresIn: "7d"});
}

const registerUser = async(req:Request,res:Response)=>{
    try {
        const {name,email,password} = req.body;
        let user = await userModel.findOne({email})
        //Checks
        if (user) {
            return res.status(400).json("user with the given email already exits...")
        }
        if (!name || !email || !password){
            return res.status(400).json("All fields are required")
        }
        if (!validator.isEmail(email)){
            return res.status(400).json("Email must be valid email...")
        }
        if (!validator.isStrongPassword(password)){
            return res.status(400).json("Password should be a strong password...")
        }
        
        user = new userModel({name,email,password})
        user.password = await bcrypt.hash(user.password,bcryptsalt)
        await user.save()
    
        const token = createToken(user._id);
        res.status(200).json({_id:user._id,name,email,token})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

const loginUser = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        let user = await userModel.findOne({email})
        const isValidPassword = await bcrypt.compare(password,user.password)
        //Checks
        if (!email || !password){
            return res.status(400).json("Please fill all fields..")
        }
        if (!user) {
            return res.status(400).json("Invalid Email or Password...")
        }
        if (!isValidPassword) {
            return res.status(400).json("Invalid Email or Password...")
        }
        
        const token = createToken(user._id);
        res.status(200).json({_id:user._id,name:user.name,email,token})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

const finduser= async(req:Request,res:Response) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


const getalluser= async(req:Request,res:Response) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


export {registerUser,loginUser,finduser,getalluser}