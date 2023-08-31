import { NextFunction, Request, Response } from 'express';
import AppError from './../utils/appError';

const globalErrorHandler = ( err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        // Handle known application-specific errors
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // Handle unexpected errors
        console.error('Unhandled error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};

export default globalErrorHandler;
