import { Request, Response } from 'express'
import TaskModel from '../Database/schema'

const updateTask = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id // task id ...
    const updateData = req.body  // data to be updated ...

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateData, {
            new: true, // Return the updated document
        })

        // if there is no task with that id ...
        if (!updatedTask) {
            res.status(404).json({ error: 'Task not found' })
        }
        res.json(updatedTask)
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the task' })
    }
}

export default updateTask