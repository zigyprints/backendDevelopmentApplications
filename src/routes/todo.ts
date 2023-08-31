import express, { Request, Response } from "express";
import { ToDo } from "../models/todo";
import { todo } from "../interfaces/interface";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos: todo[] = await ToDo.find({});
    res.send(todos);
  } catch (error) {
    res.status(500).send("Error fetching todos");
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const todo: todo = await ToDo.findById(id);
    if (!todo) {
      res.send("ToDo not found");
    } else {
      res.send(todo);
    }
  } catch (error) {
    res.status(500).send("Error fetching ToDo");
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { task, description, completed }: todo = req.body;
    const newToDo = new ToDo({
      task,
      description,
      completed,
    });
    await newToDo.save();
    res.send("ToDo Created");
  } catch (error) {
    res.status(500).send("Error creating ToDo");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { task, description, completed }: todo = req.body;
    const id: string = req.params.id;
    const updatedToDo = await ToDo.findByIdAndUpdate(id, {
      task,
      description,
      completed,
    });
    res.send("Updated the Todo");
  } catch (error) {
    res.status(500).send("Error updating ToDo");
  }
});

export default router;
