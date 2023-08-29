const User = require("../models/user");
const jwt = require('jsonwebtoken');


exports.create = async (req, res) => {
    const { name, email, password } = req.body;
    const olduser = await User.findOne({email});
    if(olduser) return res.status(401).json({error:'This email is already in use'})
  
    const newUser = new User({ name, email, password });
    await newUser.save();

  
    res.status(201).json({user:{
      id:newUser._id,
      name:newUser.name,
      email:newUser.email,
    }});
  };


  exports.signIn = async(req,res,next)=>{
    const{email,password} = req.body;
    try{
     const user = await User.findOne({email})
     if(!user) return sendError(res,'Email/Password mismatch!');
  
     const matched = await user.comparePassword(password);
     if(!matched) return sendError(res,'Email/Passwrod mismatch')
  
     const{_id, name,role,isVerified} = user
     const jwttoken = jwt.sign({userId:user._id},process.env.JWT_SECRET)
     res.json({user:{id:_id,name,email,token:jwttoken}});
    }
    catch(error){
     next(error.message);
   }
   }