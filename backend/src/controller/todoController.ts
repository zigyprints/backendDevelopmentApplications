import { NextFunction, Request, Response } from "express";
import todoModel from "./../model/todoModel";
import appError from "./../utils/appError";
import asyncWrapper from "../utils/asyncWrapper";

// A utility function to execute SQLite queries and return results as a promise
function setter(query: string, param: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        todoModel.db.all(query, param, (err: Error | null, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Handler to get all tasks
export const getAllTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT * FROM TASK';
    const task = await setter(query, []);
    res.status(200).json({
        status: 'success',
        data: task
    });
});

// Handler to get a single task by ID
export const getATask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT * FROM TASK WHERE ID = ?`;
    const task = await setter(query, [req.params.id]);

    if (task.length === 0) {
        return next(new appError('No Data with this ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: task
    });
});

// Handler to delete a task by ID
export const deleteATask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const query = 'DELETE FROM TASK WHERE ID = ?';
    const values = [req.params.id];
    await setter(query, values);

    res.status(200).json({
        status: 'Success',
    });
});

// Handler to update a task by ID
export const updateATask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date();
    let formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');

    if (req.body.COMPLETED === 0) {
        formattedDate = null;
    }

    const query = `UPDATE TASK SET COMPLETED = ?, FN_DATE = ? where ID = ?`;
    const values = [req.body.COMPLETED, formattedDate, req.params.id];

    await setter(query, values);
    res.status(200).json({
        status: 'success',
    });
});

// Handler to add a new task
export const addATask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const query = `INSERT INTO TASK (TASK, COMPLETED, ST_DATE) VALUES (?, 0, ?);`;
    const values = [req.body.TASK, formattedDate];

    await setter(query, values);
    res.status(200).json({
        status: 'success',
    });
});
