import { NextFunction, Request, Response } from 'express'
import { ISaveTodoBody } from '../interfaces/app.dto'

export class Validation {
  public static bodyValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { title, description, priority }: ISaveTodoBody = req.body
    if (!title) return res.status(400).send({ message: 'Title missing!' })
    if (description)
      return res.status(400).send({ message: 'Description missing!' })
    if (!priority) return res.status(400).send({ message: 'Priority missing!' })
    const prioritySet = ['low', 'mid', 'high']
    if (!prioritySet.includes(priority))
      return res.status(400).send({ message: 'Invalid Priority value!' })
    next()
  }
}
