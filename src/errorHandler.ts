import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction  // The callback function to pass control to the next middleware function
) => {
  console.error(err);

  // Send a JSON response with a 500 Internal Server Error status code
  // and an error message to the client.
  res.status(500).json({ error: 'Something went wrong' });
};
