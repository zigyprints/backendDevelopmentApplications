import Task from "../models/model.task";
import { Request, Response } from 'express';

export const addTask = async (  request : Request, response : Response) =>{

    let data = request.body;

    try{

        const newTask = new Task({
            taskId:data.taskId,
            taskName:data.taskName,
            taskDescription:data.taskDescription,
            isCompleted:data.isCompleted
        });

        newTask.save();

        response.status(200).json({message:'Added a new task!'});

    }

    catch(error){
        response.status(500).json(error);
    }

};