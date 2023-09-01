import express, { Request, Response } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

// Create a task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Get a specific task
router.get("/:id", getTaskById);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
