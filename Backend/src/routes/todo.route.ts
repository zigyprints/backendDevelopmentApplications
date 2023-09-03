import express, { Request, Response } from 'express';
import TodoModel, { Todo } from '../models/todo.model';
const todoRouter = express.Router();


// Create a Todo (POST)
todoRouter.post('/addTodo', async (req: Request, res: Response) => {
  try {
    const todo: Todo = new TodoModel(req.body);
    const savedtodo = await todo.save();
    res.status(201).json({msg:"Todo created successfully"});
  } catch (error) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

// Retrieve all todos (GET)
todoRouter.get('/', async (req: Request, res: Response) => {
  try {
    const todos: Todo[] = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve a todo by ID (GET)
todoRouter.get('/getTodoById/:id', async (req: Request, res: Response) => {
  try {
    const todo: Todo | null = await TodoModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a todo by ID (PUT)
todoRouter.put('/editTodo/:id', async (req: Request, res: Response) => {
  try {
    const updatedtodo: Todo | null = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedtodo) {
      return res.status(404).json({ error: 'todo not found' });
    }
    res.json({ msg: 'Todo updated successfully', Todo: updatedtodo });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo by ID (DELETE)
todoRouter.delete('/deleteTodo/:id', async (req: Request, res: Response) => {
  try {
    const deletedtodo: Todo | null = await TodoModel.findByIdAndRemove(
      req.params.id
    );
    if (!deletedtodo) {
      return res.status(404).json({ error: 'todo not found' });
    }
    res.json({ message: 'Todo deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default todoRouter;
