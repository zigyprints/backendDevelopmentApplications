import { Request, Response, NextFunction } from "express";

// A wrapper function to handle asynchronous route handlers
const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Call the asynchronous route handler and handle any errors using catch
        fn(req, res, next).catch(next);
    };
};

export default asyncWrapper;
