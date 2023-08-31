import {Task} from '../models/tasks';
import {Request,Response} from 'express';

import { isValidObjectId } from "mongoose";
import { sendError }  from '../utils/helper';


export const addTo = async (req:Request, res:Response) => {
    const {subject,description,status } = req.body;
    const newTask = new Task({subject,description,status });
    await newTask.save();

  
    res.status(201).json({Task:{
      subject:newTask.subject,
      description:newTask.description,
      status:newTask.status,
    }});
  };

  export const getAll = async(req:Request,res:Response)=>{
    const tasks = await Task.find();
    if(tasks){
      res.json({
        message: "tasks retrieved",
        data: tasks,
      });
    }
  }

  export const getSingleTask = async(req:Request,res:Response)=>{
    const{id} = req.params;
    if(!isValidObjectId(id)) return sendError(res,'Invalid request');
    const task = await Task.findById(id);
    if(!task) return sendError(res,'Invalid request,Task not found',404);
    res.json(task);
  }

  export const updateTask = async(req:Request,res:Response)=>{
    const{subject,description,status} = req.body;
    const {id} = req.params;
    if(!isValidObjectId(id)) return sendError(res,'Invalid request!');
    const task = await Task.findById(id);
    if(!task) return sendError(res,'Invalid request,record not found');

    task.subject = subject;
    task.description = description;
    task.status =status;

    await task.save();
    res.status(201).json(task);
  }

  export const removeTask = async(req:Request,res:Response)=>{
    const{id} = req.params;
    const task = await Task.findById(id);
    // if(task.status == "Finish"){
    //   await Task.findByIdAndDelete(id);
    // }

    await Task.findByIdAndDelete(id);
    res.json({message:"record removed successfully"});
  }




