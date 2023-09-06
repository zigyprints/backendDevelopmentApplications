import { Request, Response } from "express";
import { ToDo } from "../models";

// get all todos
export const getAll = async (req: Request, res: Response) => {
  try {
    // destructure req body
    const userId = req.body.token.id;

    // get all todos for the user
    const todos = await ToDo.findAll({ where: { userId } });

    // return todos list
    return res
      .status(200)
      .json({ todos, message: "fetched todos successfully" });
  } catch (error) {
    return res.status(500).json({ message: "some internal error occur" });
  }
};

// create new todo
export const create = async (req: Request, res: Response) => {
  try {
    // destructuring req body
    const userId = req.body.token.id;
    const { todo } = req.body;

    // creating new todo
    const newTodo = await ToDo.create({ todo, userId });

    // return newly created todo
    return res
      .status(200)
      .json({ todo: newTodo, message: "new todo created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Some internal error occur" });
  }
};

// update todo
export const update = async (req: Request, res: Response) => {
  try {
    // destructuring req body
    const userId = req.body.token.id;
    const { todo, isCompleted } = req.body;
    // get todo id which has to be updated
    const todoId = req.params.id;

    // check wheter todo exist or not
    const existingTodo = await ToDo.findOne({ where: { id: todoId, userId } });
    if (!existingTodo)
      return res.status(400).json({
        message:
          "Either todo doesn't exist or user is unauthorised to update it",
      });

    // update todo
    existingTodo.todo = todo;
    existingTodo.isCompleted = isCompleted;

    await existingTodo.save();

    // return updated todo
    return res
      .status(200)
      .json({ todo: existingTodo, message: "todo updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "some internal error occur" });
  }
};

// delete todo
export const discard = async (req: Request, res: Response) => {
  try {
    // destructuring req body
    const userId = req.body.token.id;
    // get todo id which has to be deleted
    const todoId = req.params.id;

    // check wheter todo exist or not
    const existingTodo = await ToDo.findOne({ where: { id: todoId, userId } });
    if (!existingTodo)
      return res.status(400).json({
        message:
          "Either todo doesn't exist or user is unauthorised to delete it",
      });

    // delete todo
    await existingTodo.destroy();

    // return id of deleted
    return res
      .status(200)
      .json({ id: todoId, message: "todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "some internal error occur" });
  }
};
