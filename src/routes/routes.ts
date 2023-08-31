import express, { Request, Response } from "express";

const router = express.Router();
const tasks: { tasksArray: string[] } = {
  tasksArray: ["task100", "task2", "task3"],
};

// Create a task
router.post("/", (req: Request, res: Response) => {
  tasks.tasksArray = [...tasks.tasksArray, ...req.body];
  console.log("New task : ", req.body);
  console.log("All tasks : ", tasks);
  res.json({ message: "Task created", tasks: tasks.tasksArray });
});

// Get all tasks
router.get("/", (req: Request, res: Response) => {
  console.log(tasks);
  res.json(tasks);
});

// Get a specific task
router.get("/:id", (req: Request, res: Response) => {
  const taskId: number = parseInt(req.params.id, 10);
  //   const task = { id: taskId, title: "Sample Task" };
  const task: string = tasks.tasksArray[taskId];
  res.json(task);
});

// Update a task
router.put("/:id", (req: Request, res: Response) => {
  const taskId: number = parseInt(req.params.id, 10);

  //   const task = { id: taskId, title: "Sample Task" };
  const task: string = tasks.tasksArray[taskId];
  console.log("Task to update : ", task);
  console.log("New task : ", req.body[0]);
  tasks.tasksArray[taskId] = req.body[0];
  console.log("All tasks : ", tasks);

  res.json({ message: `Task ${taskId} updated`, tasks: tasks.tasksArray });
});

// Delete a task
router.delete("/:id", (req: Request, res: Response) => {
  const taskId: string = req.params.id;
  res.json({ message: `Task ${taskId} deleted` });
});

export default router;
