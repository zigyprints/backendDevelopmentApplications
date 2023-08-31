import { NextFunction, Request, Response } from 'express'

export const tryCatch =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return controller(req, res)
    } catch (e) {
      next(e)
    }
  }
