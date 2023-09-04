const Todo=require("../models/todoData")

exports.createATodo = async (req, res,next) => {
    const newTodo = new Todo(req.body);
    await newTodo.save()
    .then((todoCreated)=>{
        res.status(200).json({message:"Create a new todo successfully."})
        next();
    })
    .catch((err)=>{
        res.status(500).json({message:err})
    })
  };