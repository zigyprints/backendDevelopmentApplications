import { Request, Response } from "express";
import { Todo } from "../utils/schema";
import { initializeDatabase } from "../database/db";
import "dotenv/config";

// Get all todos
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    // Initialize the database connection
    const db = await initializeDatabase();

    // SQL query to select all todos
    const query = "SELECT * FROM todos";

    // Execute the query
    db.all<Todo[]>(query, function (err, todos) {
      db.close();
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Return the todos as JSON response
        res.json(todos || []);
      }
    });
  } catch (error) {
    // Handle errors if the database connection or query fails
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single todo by ID
export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Initialize the database connection
    const db = await initializeDatabase();

    // SQL query to select a todo by its ID
    const query = "SELECT * FROM todos WHERE id = ?";

    // Execute the query with the provided ID
    db.get<Todo>(query, id, function (err, todo) {
      db.close();
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else if (!todo) {
        // Return a 404 error if the todo is not found
        res.status(404).json({ error: "Todo not found" });
      } else {
        // Return the todo as JSON response
        res.json(todo);
      }
    });
  } catch (error) {
    // Handle errors if the database connection or query fails

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
  const { name, description, completed } = req.body;
  if (!name || !description) {
    // Validate request body for required fields
    res.status(400).json({ error: "Name and description are required" });
    return;
  }

  try {
    // Initialize the database connection
    const db = await initializeDatabase();

    // SQL query to insert a new todo
    const query = "INSERT INTO todos (name, description, completed) VALUES (?, ?, ?)";

    // Execute the query to create a new todo
    db.run(query, [name, description, completed || false], function (err) {
      db.close();
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Return the ID of the newly created todo as JSON response
        const newTodoId = this.lastID;
        res.status(201).json({ id: newTodoId, name, description, completed });
      }
    });
  } catch (error) {
    // Handle errors if the database connection or query fails
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a todo by ID
export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  if (!name || !description) {
    // Validate request body for required fields
    res.status(400).json({ error: "Name and description are required" });
    return;
  }

  try {
    // Initialize the database connection
    const db = await initializeDatabase();

    // SQL query to update a todo by its ID
    const query = "UPDATE todos SET name = ?, description = ?, completed = ? WHERE id = ?";

    // Execute the query to update the todo
    db.run(query, [name, description, completed, id], function (err) {
      db.close();
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Return the updated todo as JSON response
        res.json({ id, name, description, completed });
      }
    });
  } catch (error) {
    // Handle errors if the database connection or query fails
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a todo by ID
export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Initialize the database connection
    const db = await initializeDatabase();

    // SQL query to delete a todo by its ID
    const query = "DELETE FROM todos WHERE id = ?";

    // Execute the query to delete the todo
    db.run(query, [id], function (err) {
      db.close();
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Return a success message after deleting the todo
        res.status(204).json({ message: "Todo deleted successfully" });
      }
    });
  } catch (error) {
    // Handle errors if the database connection or query fails
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Home route handler
export const home = async (req: Request, res: Response) => {
  // Return a welcome message for the home page
  res.status(200).json({ "result": "Welcome to Home Page" });
};
