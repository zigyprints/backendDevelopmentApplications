import { Request, Response, NextFunction } from 'express';
import config from '../config/connect';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  // Verify the API key in the request header
  const apiKey = req.header('x-api-key');

  if (apiKey !== config.secretKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
