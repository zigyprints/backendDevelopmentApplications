import { Request, Response, NextFunction } from 'express'
import { HydratedDocument } from 'mongoose'
import { ITodoSchema, todoModel } from '../schema/todo.schema'

interface IRequestBody {
  title: string
  description: string
  priority: string
}

export class appController {
  public static async saveTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const todoBody: IRequestBody = req.body
    console.log(await todoModel.addTodo(todoBody))

    return res.status(200).send({ message: 'Hello' })
  }
  public static async getTasks(req: Request, res: Response): Promise<Response> {
    const { taskid } = req.params
    const { priority = null } = req.query
    if (taskid) {
      const task = await todoModel.findById(taskid)
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
    const { title, description } = req.body
    return res.status(200).send({ message: 'Hello' })
  }
  public static async deleteTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { taskid } = req.params
    console.log(await todoModel.findByIdAndDelete(taskid))
    return res.status(200).send({ ack: true })
  }
}
