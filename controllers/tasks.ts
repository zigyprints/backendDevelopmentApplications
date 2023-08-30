import Task from '../db/connect';
import  { Request, Response, NextFunction } from 'express';


export default class TaskController {
    static async createTask(req: Request, res: Response){
        try {
            const taskResponse = await Task.create(req.body);
            res.json({taskResponse});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    static async getTasks(req: Request, res: Response){
        try {
            const tasks = await Task.find();
            res.json({tasks});
        } catch (error: any) {
            res.status(404).json({error: error.message});
        }
    }

    static async deleteTask(req: Request, res: Response){
        try {
            const tasks = await Task.findOneAndDelete(req.body);
            res.json({tasks});
        } catch (error: any) {
            res.status(404).json({error: error.message});
        }
    }

    static async updateTask(req: Request, res: Response){
        try {
            const id = req.params.id;
            const tasks = await Task.findOneAndUpdate({_id:id}, req.body, {new:true, runValidators:true});
            res.json({tasks});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    static async getTask(req: Request, res: Response){
        try {
            const query = req.query.task;
            // const tasks = await Task.find(query);
            const tasks = await Task.find({ task: { $regex: `^${query}`, $options: 'i' } });
            res.json({tasks});
        } catch (error: any) {
            res.status(404).json({error: error.message});
        }
    }
}