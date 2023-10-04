const mongoose = require('mongoose');
const {}=require('validator');
const bcrypt=require('bcrypt');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name']
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
        validate:[validator.isEmail,'Please provide a valid email'],
        index:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:6
    },
    picture:{
        type:String,
        default:'https://res.cloudinary.com/douqbebwk/image/upload/v1628168483/avatar/avatar_cugq40.png'
    },
    newMessages:{
        type:Object,
        default:{}
    },
    status:{
        type:String,
        default:'online'
    },
},{minimize:false});

const User = mongoose.model('User',UserSchema);

module.exports=User;
