import { Request, Response } from "express";
import { ITodo } from "../../types/todo"
import Todo from "../../models/todo"


// Returns all the Todos
const getTodos = async (req: Request, res: Response): Promise<void> => {
    try{
        const todos: ITodo[] = await Todo.find();
        res.status(200).json({ todos })
    }catch(error){
        throw error;
    }
}

// Returns the todo added
const addTodo = async (req:Request, res:Response) => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">
    
        const todo: ITodo = new Todo({
          name: body.name,
          description: body.description,
          status: body.status,
        })
    
        const newTodo: ITodo = await todo.save()
    
        res.status(201).json({ message: "Todo added", todo: newTodo })
      } catch (error) {
        throw error
      }
}

// Returns updated todo
const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
        { _id: id },
        body
      )
      res.status(200).json({
        message: "Todo updated",
        todo: updateTodo
      })
    } catch (error) {
      throw error
    }
}

// Returns deleted todo
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
        req.params.id
      )
      res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo
      })
    } catch (error) {
      throw error
    }
  }
  
export { getTodos, addTodo, updateTodo, deleteTodo }