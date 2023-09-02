import { Request, Response } from 'express';
import Task, { ITask } from '../model/model';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';


const router = Router();


/**
 * @swagger
 * /api/todo/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with the provided title and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */

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
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks.
 *     responses:
 *       200:
 *         description: Successful response with a list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *       500:
 *         description: Server error.
 */

router.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
/**
 * @swagger
 * /api/todo/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update the task with the provided ID using the given data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

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


/**
 * @swagger
 * /api/todo/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete the task with the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

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
