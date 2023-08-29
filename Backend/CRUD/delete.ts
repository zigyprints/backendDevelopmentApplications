import { Request, Response } from 'express'
import TaskModel from '../Database/schema'

const deleteTask = async (req: Request, res: Response): Promise<void> => {
    // we require id of the task to be deleted ...
    const taskId = req.params.id
    try {
        const deleteIt = await TaskModel.findByIdAndDelete(taskId)

        // there was no task with that id ...
        if (!deleteIt) {
            res.status(404).json({ error: 'Task not found' })
        }

        res.json({ message: "Task deleted Succesfully ..." })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the task' })
    }
}

export default deleteTask