import { Request, Response } from 'express';
import Task, { ITask } from '../model/model';
import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const router = Router();


router.post("/tasks", async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json({ message: "Task added successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /api/todo/tasks:
 *   get:
 *     description: Get all tasks
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server Error
 */
router.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put("/tasks/:id", async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const { title, description, completed } = req.body;

        const task: ITask | null = await Task.findByIdAndUpdate(
            taskId,
            { title, description, completed },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete("/tasks/:id", async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;

        const deletedTask: ITask | null = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
