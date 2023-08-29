import { Request, Response } from 'express'
import TaskModel from '../Database/schema'

const getTask = async (_: Request, res: Response): Promise<void> => {
    try {
        // AllTask is a collection of all tasks present currently in the database ....
        const AllTask = await TaskModel.find()
        res.json(AllTask)
    } catch (error) {
        res.status(500).json({ error: 'Error In fetching Tasks ....' })
    }
}

export default getTask