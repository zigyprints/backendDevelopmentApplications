const asyncHandler = require("express-async-handler");
const { models } = require("mongoose");
const Chat = require('../models/chatModel');
const User = require("../models/UserModel");
const accessChat = asyncHandler(async(req,res)=>{
    const {userId} = req.body;
    if(!userId){
        console.log("UsedId param not sent with request");
        return res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroup:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},    // req.user._id from authmiddleware
            {users:{$elemMatch: {$eq:userId}}},         // userId as requested by user
        ]
    }).populate("users","-password").populate("latestMessage");
    isChat = await User.populate(isChat,{
        path:'latestMessage.sender',
        select: "name pic email"
    });
    if(isChat.length>0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            charName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        };
        try{
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne(
                {_id:createdChat._id}).populate("users","-password");
            res.status(200).send(FullChat);
        }catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    }
})

const fetchChats = asyncHandler(async(req,res)=>{
    try{
        Chat.find({users:{$elemMatch:{
             $eq: req.user._id}}}).populate("users","-password")
             .populate("groupAdmin","-password")
             .populate("latestMessage")
             .sort({updatedAt:-1})
             .then(async(results)=>{
                results = await User.populate(results,{
                    path:"latestMessage.sender",
                    select:"name pic email",
                });
                res.status(200).send(results);
             });

    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

const createGroupChat = asyncHandler(async(req,res)=>{
     if(!req.body.users || !req.body.name){
        return res.status(400).send({message: "Pleasr fill all the Fields"});
     }
     var users = JSON.parse(req.body.users);
     if(users.length<2){
        return res.status(400).send("more than 2 users are required to form a group chat");
     }
     users.push(req.user);
     try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users:users,
            isGroupChat: true,
            groupAdmin: req.user
        });
        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password");
        res.status(200).send(fullGroupChat);
     }
     catch(err){
        res.status(400);
        throw new Error(err.message); 
     }
})

const renameGroup = asyncHandler(async(req,res)=>{
    const {chatId, chatName} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName 
        },{
            new:true,
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password");
    if(!updatedChat){
        res.status(400);
        throw new Error("Chat not Found!!");
    }else{
        res.json(updatedChat);
    }
})

const addToGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId},
    },{
        new:true
    }).populate("users","-password")
    .populate("groupAdmin","-password");
    if(!added){
        res.status(401);
        throw new Error("chat not found");
    }else{
        res.json(added);
    }
})

const removeFromGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId},
    },
    {  new:true }
    ).populate("users","-password")
    .populate("groupAdmin","-password");
    if(!removed){
        res.status(401);
        throw new Error("chat not found");
    }else{
        res.json(removed);
    }
})

module.exports = {accessChat,
    fetchChats,
     createGroupChat,
     renameGroup,
     addToGroup,
     removeFromGroup};