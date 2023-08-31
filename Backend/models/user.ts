import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Password } from '../utils/classpassword';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        trim:true
    },
    email:{
        type:String,
        required :true,
        unique:true
    },
    password:{
        type:String,
        required :true
    },  
});

userSchema.pre('save',async function(next){
    const hashedPassword = await Password.hashPassword(this.password);
    this.password = hashedPassword;
});


export const User = mongoose.model("User",userSchema);


