import Task from "../models/model.task";
import { Request, Response } from 'express';


export const deleteTask = async (request: Request, response: Response) => {

    let  data = request.body; // getting the ID of the task to be deleted


    try{

        // finding if the task with the id provided exists or not:

        let exist = await Task.findOne({taskId:data.taskId});

        if(!exist){

            response.status(405).json("Task does not exist");
            return;

        }

        else{

            //if one task is to be deleted

            let deletedItem = await Task.findOneAndDelete({taskId:data.taskId});
         
              response.status(200).json("Task deleted");
      

        }

    }

    catch(error){

        response.status(500).json(error);
        
    };

}