import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import {Request, Response} from 'express';

const postLogin = async (req:Request, res:Response)=> {
    const foundUser = await User.findOne({username:req.body.username});
    if(foundUser) {
        const correctPass = bcrypt.compareSync(req.body.password, foundUser.password);
        if(correctPass) {
            const token = jwt.sign({uid:foundUser._id}, process.env.JWT_KEY!);
            res.cookie('login', token).cookie('username', foundUser.username).status(200).send({message:`User with username:${foundUser.username} is logged in.`});
        } else {
            res.status(400).send({message:'User credentials invalid'});
        }    } else {
        res.status(400).send({message:'User does not exists'})
    }
}

export default postLogin;