import express, { Request, Response } from "express";
import { ToDo } from "../models/todo";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await ToDo.find({});
    res.send(todos);
  } catch (error) {
    res.status(500).send("Error fetching todos");
  }
});

export default router;
