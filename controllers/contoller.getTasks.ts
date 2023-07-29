import Task from "../models/model.task";
import { Request, Response } from 'express';

export const getTasks = async (request: Request, response: Response) => { 

    // if we want to retrieve a single task: 

    let data = request.body;

    try{

        //if we retrieve with the help of task id:

        let myTask = await Task.findOne({taskId:data.taskId});
        response.status(200).json(myTask);

        //if we retrieve with the help of other parameters like task name...:

        // let myTask = Task.findOne({taskName:data.taskName});
        // response.status(200).json(myTask);


        //Or if we want to get all the task which is present: 

        // let myTask = Task.find();
        // response.status(200).json(myTask);

    }

    catch(error){

        response.status(404).json({message:"Task not found ;("});

    }

}