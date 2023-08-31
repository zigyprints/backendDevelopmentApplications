import { Request, Response, NextFunction } from 'express'

export class appController {
  public static async saveTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    return res.status(200).send({ message: 'Hello' })
  }
  public static async getTasks(req: Request, res: Response): Promise<Response> {
    console.log(req.hostname)
    return res.status(200).send({ message: 'Hello' })
  }
  public static async updateTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    return res.status(200).send({ message: 'Hello' })
  }
  public static async deleteTasks(
    req: Request,
    res: Response
  ): Promise<Response> {
    return res.status(200).send({ message: 'Hello' })
  }
}
