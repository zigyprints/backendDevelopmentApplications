import messageModel from '../modals/messageModel.js';
import {Request,Response } from 'express';

const createMessage = async(req:Request,res:Response)=>{
    try {
        const {chatId,senderId,text} = req.body;
        const message = new messageModel({
            chatId,
            senderId,
            text,
        })

        const response = await message.save()
        res.status(200).json(response)
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

const getMessages = async(req:Request,res:Response)=>{
    try {
        const {chatId} = req.params;
        const messages = await messageModel.find({chatId})
        res.status(200).json(messages)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

export {createMessage,getMessages}