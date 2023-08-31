const db=require('../database');
const AppError= require('../utils/AppError');
import { Request, Response, NextFunction } from 'express';


exports.getTask = (req:Request,res:Response,next:NextFunction) => {
    const userId=req.body.userId;
    const query=`SELECT * from TASK where userId=?`;

    db.all(query,[userId],(err:Error,rows:any)=>{
        if(err){
            return next(new AppError(err.message,));
        }
        
        res.status(200).json({
            status: 'success',
            data:{
                rows
            }
        });

    });
};

exports.createTask =  (req:Request,res:Response,next:NextFunction) => {
    
    const {userId,description}=req.body;
    
    const query=`INSERT INTO TASK (userId,description,timestamp) VALUES (?,?,?);`;

    db.run(query,[userId,description,Date.now()],function(this: import('sqlite3').RunResult,err:Error){
        if(err){
            return next(new AppError('Unable to create task.Please try again!',500));
        }

        const taskId=this.lastID;
        
        res.status(201).json({
            status: 'success',
            data:{
                taskId
            }
        });

    });
};

exports.updateTask = (req:Request,res:Response,next:NextFunction) => {
    
    const {userId,description}=req.body;
    const taskId=req.params.taskId;

    const query=`UPDATE TASK SET description=? WHERE taskId=?;`;

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

exports.deleteTask = (req:Request,res:Response,next:NextFunction) => {
    const {userId}=req.body;
    const taskId=req.params.taskId;

    const query=`DELETE FROM TASK WHERE taskId=? AND userId=?;`;

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