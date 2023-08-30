import { NextFunction, Request, Response } from "express";
import todoModel from "./../model/todoModel";

function Getter(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        todoModel.db.all(query, [] , (err: Error | null, rows : any[]) => {
            if(err){
               reject(err)
            }else{
               resolve(rows)
            }
        })
    })
}

export const getAllTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = 'SELECT * FROM TASK';
        const task = await Getter(query);
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getATask = async (req: Request, res: Response, next: NextFunction) => {

}

export const deleteATask = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const updateATask = async (req: Request, res: Response, next: NextFunction) => {
    
}