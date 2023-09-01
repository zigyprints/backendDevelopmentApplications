import { Request, Response } from 'express'
import { todoModel } from '../schema/todo.schema'
import { ISaveTodoBody, IUpdateTodoBody } from '../interfaces/app.dto'
import { CustomError } from '../error/custom.error'
import { MongooseError } from 'mongoose'

export class appController {
  //
  // Method to save todo

  public static async saveTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const todoBody: ISaveTodoBody = req.body
    const newTodo = await todoModel.addTodo(todoBody)
    if (newTodo instanceof MongooseError)
      throw CustomError.mongooseError(newTodo.name)
    return res.status(201).send(newTodo)
  }

  //
  // Method to get todos

  public static async getTasks(req: Request, res: Response): Promise<Response> {
    const { taskid } = req.params
    const { priority = null } = req.query
    if (taskid) {
      const task = await todoModel.getTodoById(taskid)
      if (task instanceof MongooseError)
        throw CustomError.mongooseError('Cannot fetch data for invalid id!')
      if (!task) return res.status(200).send({ message: 'Todo not found!' })
      return res.status(200).send(task)
    }
    const tasks = await todoModel.getTodos(priority ? String(priority) : null)
    return res.status(200).send(tasks)
  }

  //
  // Method to update todo

  public static async updateTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { taskid } = req.params
    const { title, description }: IUpdateTodoBody = req.body
    const updateTodo = await todoModel.updateTodo(taskid, title, description)
    if (updateTodo instanceof MongooseError)
      throw CustomError.mongooseError('Requested Task could not be found!')
    return res.status(200).send({ ack: true, updateTodo })
  }

  //
  // Method to delete todo

  public static async deleteTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { taskid } = req.params
    const deletedTodo = await todoModel.deleteTodo(taskid)
    if (!deletedTodo)
      throw CustomError.mongooseError('Requested Task could not be found!')
    return res.status(200).send(deletedTodo)
  }
}
