import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { Request, Response } from 'express';

const postSignup = async (req:Request, res:Response) => {
    const existingUser = await User.findOne({username: req.body.username});
    if(!existingUser) {
        const hash = await bcrypt.hashSync(req.body.password, 10);
        const user = User.create({
            username:req.body.username,
            password:hash
        }).then(response=>res.status(200).send({message:`User with username:${response.username} has been created`}));
    } else {
        res.status(400).send({message:'User already exists'});
    }
}

export default postSignup;