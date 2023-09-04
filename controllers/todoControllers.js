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


exports.getAllTodo = (req, res) => {
    Todo.find()
      .exec()
      .then((todos) => {
        res.status(200).json({ todos: todos });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Unable to fetch todos' });
      });
  };
  
  
exports.deleteTodo=(req,res)=>{
    const todoID=req.params.todoID
    console.log(todoID)
    Todo.findByIdAndDelete(todoID)
    .exec()
    .then((deleted)=>{
        return res.status(200).json({message:"Todo Deleted Succesfully"})
    })
    .catch((err)=>{
        return res.status(400).json({
            message:err
        })
    })
}
  
exports.updateTodo = (req, res) => {
    const todoID = req.params.todoID; 
    console.log(req.query)
    console.log(todoID)
    Todo.findById(todoID)
      .exec()
      .then((todoData) => {
        if (!todoData) {
          return res.status(404).json({ message: "Todo not found." });
        }
        todoData.title = req.body.title || todoData.title;
        todoData.description = req.body.description || todoData.description;
        todoData.completed = req.body.completed || todoData.completed;
        const updated = todoData.save();
        return res.status(200).json({ message:"Updated Successfully" });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  };
  