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