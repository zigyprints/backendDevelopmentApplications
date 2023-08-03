const express=require('express')
const User = require('../model/user.model')
require('dotenv').config();
const router=express.Router();

router.post('/', async (req, res) => {
    const { tokenId,name,email } = req.body;
    if (tokenId) {
        const existingData=await User.findOne({ tokenId: tokenId })
        if(existingData){
            return res.status(200).json(existingData)
        }
        // console.log(tokenId)
        else{
            try{
                const newUser = await User.create({
                    name,
                    email,
                    tokenId
                });
                res.status(200).json({success: true,data: newUser})
            }
            catch(err){
                res.status(500).json({success: false})
            }
        }
        }
});

router.post('/verify',async (req,res)=>{
    const {tokenId} = req.body;
    if (tokenId){
        const existingData=await User.findOne({tokenId: tokenId});
        if (existingData){
            return res.status(200).json({ok: true,data: existingData});
        }
        else{
            return res.status(200).json({ok: false})
        }
    }
})

module.exports=router;