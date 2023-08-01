import User from "../models/User";
import Todo from "../models/Todo";
import express from 'express';
import MyError from "../error";
import { MyRequest } from "../interfaces/myrequest";

export const add = async (req: MyRequest, res: express.Response, next: any) => {

    const newTodo = new Todo({ userId: req.user.id, ...req.body });

    try {
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo);
    } catch (err) {
        next(err);
    }
};

export const update = async (req: MyRequest, res: express.Response, next: any) => {
    try {
        const newTodo = await Todo.findById(req.params.id);
        if (!Todo) return next(new MyError(404, "Todo not found!"));
        if (req.user.id === newTodo.userId) {
            const updated = await Todo.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updated);
        } else {
            return next(new MyError(403, "You can update only your Todos!"));
        }
    } catch (err) {
        next(err);
    }
};

export const deleteTodo = async (req: MyRequest, res: express.Response, next: any) => {
    try {
        const todoId = req.params.id;

        const todoToDelete = await Todo.findById(todoId);

        if (!todoToDelete) {
            return next(new MyError(404, "Todo not found!"));
        }

        if (req.user.id === todoToDelete.userId) {
            await Todo.findByIdAndDelete(todoId);
            res.status(200).json({ message: "Todo deleted successfully" });
        } else {
            return next(new MyError(403, "You can delete only your Todos!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getUserTodos= async (req: MyRequest, res: express.Response, next: any) => {
    try {
      const userId = req.user.id;

      const userTodos = await Todo.find({ userId });
  
      res.status(200).json(userTodos);
    } catch (err) {
      next(err);
    }
  };
  