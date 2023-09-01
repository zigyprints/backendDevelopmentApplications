import { Request, Response, NextFunction } from 'express'
import { HydratedDocument } from 'mongoose'
import { todoModel } from '../schema/todo.schema'
import { ISaveTodoBody, IUpdateTodoBody } from '../interfaces/app.dto'

export class appController {
  public static async saveTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const todoBody: ISaveTodoBody = req.body
    const newTodo = await todoModel.addTodo(todoBody)
    if (newTodo instanceof Error) throw newTodo
    return res.status(201).send(newTodo)
  }
  public static async getTasks(req: Request, res: Response): Promise<Response> {
    const { taskid } = req.params
    const { priority = null } = req.query
    if (taskid) {
      const task = await todoModel.getTodoById(taskid)
      if (task instanceof Error) throw task
      if (!task) return res.status(200).send({ message: 'Todo not found!' })
      return res.status(200).send(task)
    }
    const tasks = await todoModel.getTodos(priority ? String(priority) : null)
    return res.status(200).send(tasks)
  }
  public static async updateTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { taskid } = req.params
    const { title, description }: IUpdateTodoBody = req.body
    const updateTodo = await todoModel.updateTodo(taskid, title, description)
    if (updateTodo instanceof Error) throw updateTodo
    return res.status(200).send(updateTodo)
  }
  public static async deleteTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { taskid } = req.params
    const deletedTodo = await todoModel.deleteTodo(taskid)
    if (!deletedTodo) return res.sendStatus(204)
    return res.status(200).send(deletedTodo)
  }
}
