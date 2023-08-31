import {Request,Response} from 'express';
export const sendError = (res:Response, error:string, statusCode:number = 401) => {
    res.status(statusCode).json({ error })
};