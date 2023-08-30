import { NextFunction, Request, Response } from "express";
import todoModel from "./../model/todoModel";

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

export const getAllTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = 'SELECT * FROM TASK';
        const task = await setter(query, []);
        res.status(200).json({
            status: 'success',
            data: task
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
    next();
}

export const getATask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = `SELECT * FROM TASK WHERE ID = ?`;
        const task = await setter(query, [req.params.id]);
        if(Object.keys(task).length === 0){
            throw new Error('No Task with this ID');
        }
        res.status(200).json({
            status: 'success',
            data: task
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
    next();
}

export const deleteATask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = 'DELETE FROM TASK WHERE ID = ?';
        const values = [req.params.id];
        const task = await setter(query, values);

        res.status(200).json({
            status: 'Success',
            data: task
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

export const updateATask = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
            data: task
        })
    } catch (error) {
        console.log(error);
        
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

export const addATask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');      // Format date as 'YYYY-MM-DD HH:MM:SS'
        
        const query = `INSERT INTO TASK (TASK, COMPLETED, ST_DATE) VALUES (?, 0, ?);`;
        const values = [req.body.TASK, formattedDate];

        const task = setter(query, values);
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json(error);
    }
    next();
}