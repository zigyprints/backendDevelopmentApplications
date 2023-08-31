import Task from '../db/connect';
import { asyncWrapper } from '../middleware/async';
import  { Request, Response, NextFunction } from 'express';
import {createCustomError} from '../errors/custom-error';


export default class TaskController {

    static createTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{
        const task = req.body.task;
        if(task.length<3){                                                                
                return next(createCustomError(`Task length should atleast be 3`, 400));         //task length should be atleast 3
        }
        const tasks = await Task.create(req.body); 
        res.status(201).json({tasks});                                                          //successfully created
    })

    static getTasks =  asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{
            const tasks = await Task.find();
            res.status(200).json({tasks});                                                     //get all tasks
    })

    static deleteTask= asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{
            const tasks = await Task.findOneAndDelete(req.body);
            if(!tasks){
                return next(createCustomError(`No task called: ${req.body.task}`, 404));               //no task found with that name
            }
            res.status(200).json({tasks});                                                     //successfully deleted
    })

    static updateTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{
            const id = req.params.id;
            if(id.length!=24){
                return next(createCustomError(`Invalid id: id length should be 24`, 422));                     //length of id is always 24
            }
            const tasks = await Task.findOneAndUpdate({_id:id}, req.body, {new:true, runValidators:true});
            if(!tasks){
                return next(createCustomError(`No task with id: ${id}`, 404));                                  //no task found with that id
            }
            res.status(200).json({tasks});                                                                      //successfully updated
    })


    //get all tasks which are completed/incomplete    (or) complete = true / complete = false

    static getTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction)=>{
            const query = req.query.completed;
            if (query !== 'true' && query !== 'false') {                                                       //true or false are the only choices
                return next(createCustomError('Invalid value for completed parameter. Use true or false.', 400));
            }
            const tasks = await Task.find({ "completed":query });
            if(!tasks){
                return next(createCustomError(`No tasks found`, 404));
            }
            res.status(200).json({tasks});                                                                     ////successfully returned tasks
    })
}