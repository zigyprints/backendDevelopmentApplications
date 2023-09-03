import express, {Response, Request} from 'express';
const app = express();
import * as db from "./functions";
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create Tasks:
app.post("/task", async (req: Request, res: Response) => {
    try{
        const result = await db.createTask(req.body);
        res.status(201).json({ id: result[0] });
    } catch(error) {
        res.status(409).json({ message: (error as Error).message });
    }
})

// Get Tasks:
app.get("/tasks", async(req: Request, res: Response) => {
    try {
        const tasks = await db.getTasks();
        res.status(200).json({ tasks });
    } catch (error){
        res.status(404).json({ message: (error as Error).message });
    }
});

// Update Tasks:
app.patch("/tasks/:id", async(req: Request, res: Response) => {
    const id = await db.updateTask(req.params.id, req.body);
    res.status(200).json({ id });
});

// Delete task:
app.delete("/tasks/:id", async(req: Request, res: Response) => {
    await db.deleteTask(req.params.id);
    res.status(200).json({ success: true });
})

app.listen(3000, () => {
    console.log("Server running on 3000");
});