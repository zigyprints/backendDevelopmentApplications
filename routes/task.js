const express=require('express');
const Task=require('../model/task.model')

const router=express.Router();

router.post('/create',async(req,res)=>{
    const {emailId,title,description,tid,date}= req.body;
    try {
        const newTask= await Task.create({
            emailId,
            title,
            description,
            tid,
            date,
        });
        res.status(200).json({success: true,data:newTask})
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.post('/retrieve',async(req,res)=>{
    const {emailId}=req.body;
    const data=await Task.find({emailId})
    if (data){
        return res.status(200).json(data)
    }
    else{
        return res.status(200).json({data:null})
    }
})

router.post('/delete',async(req,res)=>{
    const {_id}=req.body
    const data=await Task.findByIdAndDelete(_id)
    if (data){
        return res.json(data)
    }
    else{
        return res.json({data:null})
    }
})

router.post('/update',async(req,res)=>{
    const {emailId,_id,title,description,date}=req.body;
    const data=await Task.findByIdAndUpdate(_id, {  title, description,date },{new: true})
    if (data){
        return res.status(200).json(data)
    }
    else {
        return res.status(200).json(null)
    }
    
})

module.exports=router;