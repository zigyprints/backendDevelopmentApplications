const Todo=require("../models/todoData")

exports.createATodo = async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(201).json({
          message: "Create a new todo successfully.",
        });
      }
    });
  };