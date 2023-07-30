import express, {Request, Response} from 'express'
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app= express()
app.use(bodyParser.json())
app.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
mongoose.connect('mongodb+srv://ice-009:ice-009@cluster0.n4xny3y.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    content: { type: String },
  });
  const todoModel = mongoose.model('todo', todoSchema)
  app.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  app.get('/api/todos', async (req: Request, res: Response) => {
    try {
      const todos = await todoModel.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.get('/api/todos/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const todo = await todoModel.findById(id);
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.post('/api/todos', async (req: Request, res: Response) => {
    const { heading, content } = req.body;
    try {
      const newTodo = await todoModel.create({ heading, content });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  app.put('/api/todos/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { heading, content } = req.body;
    try {
      const todo = await todoModel.findByIdAndUpdate(id, { heading, content }, { new: true });
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  app.delete('/api/todos/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const todo = await todoModel.findByIdAndDelete(id);
      if (todo) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080}`);
  });


