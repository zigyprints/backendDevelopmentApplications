import { Request, Response } from "express";
import { openDb } from "../../db";
import { Todo } from "../models/todoModel";

let todoList: Todo[] = [];

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    //establish a sqlite db connection
    const db = await openDb();

    //retreiving all the data from the table todo
    const todoList = await db.all<Todo[]>("SELECT * FROM todo");
    //here "ToDO[]" is the interface and is fetching the data from the table and is storing them in this format

    // Close the database connection
    await db.close();

    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks." });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    //getting the data from the body
    const { title, description } = req.body;

    //establishing the connection with the database
    const db = await openDb();

    

    //creating a new todo
    const result = await db.run(
      " INSERT INTO todo (title, description, isCompleted) VALUES(?, ?, ?) ",
      title,
      description,
      false
    );

    //getting the id of the latest record
    const id = result.lastID;

    // Close the database connection
    await db.close();

    // Responding to the user
    const newTodo: Todo = {
      id, // BUG -> ID is showing null during res
      title,
      description,
      isCompleted: false,
    };
    res.status(201).json({message:"Successfully created new ToDo",newTodo});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create new task" });
  }
};
