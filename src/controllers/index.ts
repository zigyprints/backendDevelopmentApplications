import { Request, Response } from "express";


export const home = async (req: Request, res: Response) => {
    res.status(200).json({ "result":"Welcome to Home Page"});
};