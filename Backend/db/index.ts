import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const connect = ()=>{
    if(!process.env.MONGO_URI) throw new Error('DB URI NOT FOUND');
    
    mongoose.connect(process.env.MONGO_URI).
    then(()=>{
        console.log('db is connected');
    }).catch((ex)=>{
        console.log('error while connecting',ex);
    })
} 