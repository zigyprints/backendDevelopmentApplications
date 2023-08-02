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
      id, 
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

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);

    // Opening the SQLite database connection
    const db = await openDb();

    // Finding the task with the given ID in the 'todo' table
    const todo = await db.get<Todo>('SELECT * FROM todo WHERE id = ?', taskId);

    // Closing the database connection
    await db.close();

    if (!todo) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the task.' });
  }
};


export const updateTodo = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, isCompleted } = req.body;

    // Opening the SQLite database connection
    const db = await openDb();

    // Finding the task with the given ID in the 'todo' table
    const todo = await db.get<Todo>('SELECT * FROM todo WHERE id = ?', taskId);

    if (!todo) {
      await db.close();
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Updating the task details in the 'todo' table
    await db.run('UPDATE todo SET title = ?, description = ?, isCompleted = ? WHERE id = ?',
      title,
      description,
      isCompleted ? 1 : 0,
      taskId
    );

    // Getting the updated task from the database
    const updatedTodo = await db.get<Todo>('SELECT * FROM todo WHERE id = ?', taskId);

    // Closing the database connection
    await db.close();

    //Responding to the user after successful updation
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the task.' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try { 
    const taskId = parseInt(req.params.id);

    // Openning the SQLite database connection
    const db = await openDb();

    // Finding the task with the given ID in the 'todo' table
    const todo = await db.get<Todo>('SELECT * FROM todo WHERE id = ?', taskId);

    if (!todo) {
      await db.close();
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Deleting the task from the 'todo' table
    await db.run('DELETE FROM todo WHERE id = ?', taskId);

    // Close the database connection
    await db.close();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the task.' });
  }
};