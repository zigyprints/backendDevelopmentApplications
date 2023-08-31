import { Request, Response, NextFunction } from "express";

export const asyncWrapper = (func: Function)=> {                     //wrapper function with common logic to execute the function or handle errors 
    return async (req: Request, res: Response, next: NextFunction)=>{
        try {
            await func(req, res, next)
        } catch (error) {
            next(error);
        }
    }

}