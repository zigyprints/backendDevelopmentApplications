import { NextFunction, Request, Response } from "express";
import todoModel from "./../model/todoModel";
import appError from "./../utils/appError";
import asyncWrapper from "../utils/asyncWrapper";

function setter(query: string, param: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        todoModel.db.all(query, param , (err: Error | null, rows : any[]) => {
            if(err){
               reject(err)
            }else{
               resolve(rows)
            }
        })
    })
}

// function check_ID(id: string){
//     const query = `SELECT * FROM TASK WHERE ID = ? LIMIT 1`;
//     const result = todoModel.db.all(query,[id]); 
//     return Object.keys(result).length === 1;
// }

export const getAllTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const query = 'SELECT * FROM TASK';
        const task = await setter(query, []);
        res.status(200).json({
            status: 'success',
            data: task
        });
});

export const getATask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {

        const query = `SELECT * FROM TASK WHERE ID = ?`;
        const task = await setter(query, [req.params.id]);
        
        if(task.length === 0){
            next(new appError('No Data with this ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: task
        });
    }
)

export const deleteATask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const query = 'DELETE FROM TASK WHERE ID = ?';
        const values = [req.params.id];
        const task = await setter(query, values);

        res.status(200).json({
            status: 'Success',
        })
})

export const updateATask = asyncWrapper( async (req: Request, res: Response, next: NextFunction) => {
        const currentDate = new Date();
        let formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');

        if(req.body.COMPLETED === 0){
            formattedDate = null;
        }

        console.log(req.body);

        const query = `UPDATE TASK SET COMPLETED = ?, FN_DATE = ? where ID = ?`;
        const values = [req.body.COMPLETED, formattedDate, req.params.id];

        const task = await setter(query, values);
        res.status(200).json({
            status: 'success',
        })
})

export const addATask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');      // Format date as 'YYYY-MM-DD HH:MM:SS'
        
        const query = `INSERT INTO TASK (TASK, COMPLETED, ST_DATE) VALUES (?, 0, ?);`;
        const values = [req.body.TASK, formattedDate];

        const task = setter(query, values);
        res.status(200).json({
            status: 'success',
        });
})