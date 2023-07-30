import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const secretKey = 'my_secret_key';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user = await User.create({ username, password: hashedPassword});
        res.json({ message: 'User registered successfully', user});
    } catch (err){
        res.status(500).json({ error: 'Internal server error'});
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({ where: { username }});

        if(!user){
            res.status(404).json({ error: 'User not found'});
            return;
        }
        
        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword){
            res.status(401).json({ error: 'Invalid credentials'});
            return;
        }

        const token = jwt.sign({ userId: user.id}, secretKey, { expiresIn: '2h'});
        res.json({ message: 'Login successful', user_token: token});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
};
