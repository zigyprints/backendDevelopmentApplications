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
    const todos: todo = await ToDo.findById(id);
    if (!todos) {
      res.send("ToDo not found");
    } else {
      res.send(todos);
    }
  } catch (error) {
    res.status(500).send("Error fetching ToDo");
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { task, description, completed } = req.body;
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

export default router;
