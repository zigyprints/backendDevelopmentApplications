import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (err.name) {
    case 'DATA_NOT_FOUND':
      return res.status(404).send({ message: err.message })
    case 'VALIDATION_ERROR':
      return res.status(400).send({ message: err.message })
    case 'INVALID_ROUTE_ERROR':
      return res.status(404).send({ message: err.message })
    case 'MONGOOSE_ERROR':
      return res.status(404).send({ message: err.message })
    default:
      return res.sendStatus(500)
  }
}
