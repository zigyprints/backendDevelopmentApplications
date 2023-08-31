const db=require('../database');
const AppError= require('../utils/AppError');
import { Request, Response, NextFunction } from 'express';

/**
 * Get all task of a user
 * @route GET /api/v1/task
 * @returns {object} statusCode:200 - List of all task
 * @returns {Error}  statusCode:500 - Error message
 */

exports.getTask = (req:Request,res:Response,next:NextFunction) => {
    const userId:string=req.body.userId;
    const query:string=`SELECT * from TASK where userId=?`;

    db.all(query,[userId],(err:Error,rows:any[])=>{
        if(err){
            return next(new AppError(err.message,500));
        }

        res.status(200).json({
            status: 'success',
            data:{
                rows
            }
        });

    });
};

/**
 * Create task 
 * @route POST /api/v1/task
 * @returns {object} statusCode:201 - Id of newly created task
 * @returns {Error}  statusCode:500 - Error message
 */
exports.createTask =  (req:Request,res:Response,next:NextFunction) => {
    
    const {userId,description}=req.body;
    
    const query:string=`INSERT INTO TASK (userId,description,timestamp) VALUES (?,?,?);`;

    db.run(query,[userId,description,Date.now()],function(this: import('sqlite3').RunResult,err:Error){
        if(err){
            return next(new AppError('Unable to create task.Please try again!',500));
        }

        const taskId:number=this.lastID;
        
        res.status(201).json({
            status: 'success',
            data:{
                taskId
            }
        });

    });
};


/**
 * Update task with taskId and userId
 * @route PATCH /api/v1/task/:taskId
 * @returns {object} statusCode:201 - Id of newly created task
 * @returns {Error}  statusCode:500 || 404 - Error message || Not Found
 */
exports.updateTask = (req:Request,res:Response,next:NextFunction) => {
    
    const {userId,description}=req.body;
    const taskId:number=Number(req.params.taskId);

    const query:string=`UPDATE TASK SET description=? WHERE taskId=?;`;

    db.run(query,[description,taskId],function(this: import('sqlite3').RunResult,err:Error){
        if(err){
            return  next(new AppError('Unable to update. Please try again!',500));
        }
        if(this.changes == 0){
            return next(new AppError(`No such item exist with taskId: ${taskId} exist for userId: ${userId}`,404));
        }
        res.status(200).json({
            status: 'success'
        });

    });
};

/**
 * Delete task with taskId and userId
 * @route DELETE /api/v1/task/:taskId
 * @returns {object} statusCode:201 - Id of newly created task
 * @returns {Error}  statusCode:500 || 404 - Error message || Not Found
 */
exports.deleteTask = (req:Request,res:Response,next:NextFunction) => {
    const {userId}=req.body;
    const taskId:number=Number(req.params.taskId);

    const query:string=`DELETE FROM TASK WHERE taskId=? AND userId=?;`;

    db.run(query,[taskId,userId],function(this: import('sqlite3').RunResult,err:Error){
        if(err){
            return next(new AppError('Unable to delete. Please try again!',500));
        }
        if(this.changes == 0){
            return next(new AppError(`No item with taskId: ${taskId} exist for userId: ${userId}`,404));
        }
        res.status(204).json({
            status: 'success'
        });

    });
};