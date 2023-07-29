import Task from "../models/model.task";
import { Request, Response } from 'express';


export const updateTask = async (request: Request, response: Response) => {

    // getting the id by clicking from frontend and...further getting the data fields to be updated from the text-boxes in {body-format} 

    let data = request.body;



    try {


        const existingTask = await Task.findOne({ taskId: data.taskId });

        // getting the particular task from the database based upon the id selected by the user:

        if (existingTask) {   // checking if the entry found is not null

            existingTask.taskName = data.taskName;
            existingTask.taskDescription = data.taskDescription;
            existingTask.isCompleted = data.isCompleted;

            const updateTask = await existingTask.save();

        };

        response.status(200).json({message:'Task Updated',updateTask});
        console.log(updateTask);

    }

    catch (error) {
        console.error('Error occurred while updating task:', error)
        response.status(500).json({ error: 'Failed to update task' });

    }

};