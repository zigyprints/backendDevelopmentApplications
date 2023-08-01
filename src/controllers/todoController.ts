import { Request, Response } from "express";
import TodoModel, { itodo } from "../models/todoModel";

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
    const newTodo = new TodoModel<itodo>(req.body);

    try {
        await newTodo.save();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

    res.status(201).json({
        message: "Todo created successfully"
    })
};

//get all the todos from database
export const getAllTodos = async (req: Request, res: Response) => {
  const todos = await TodoModel.find<itodo>();

  res.json({
    todos,
  })
};

//get a particular todo by id from database
export const getTodoById = async (req: Request, res: Response) => {
  const todoId = req.params._id;

  try {
    const todo = await TodoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo doesn't exist" });
    }

    return res.json(todo);

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing todo
export const updateTodo = async (req: Request, res: Response) => {
  const todoId = req.params._id;
  const { title, description, status } = req.body;

  try {
    const todo = await TodoModel.findByIdAndUpdate(
      todoId,
      { title, description, status },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.json({
      message: "Todo was updated",
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//delete todo by id
export const deleteTodoById = async (req: Request, res: Response) => {
  const todoId = req.params._id;

  try {
    const deleteTodo = await TodoModel.findByIdAndDelete(todoId);

    if (!deleteTodo) {
      return res.status(404).json({ error: "Todo doesn't exist" });
    }

    return res.json({
        message : "Todo was deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};