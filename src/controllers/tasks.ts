import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import Task from "../models/Task";

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Public
export const getTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  }
);

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Public
export const getTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  }
);

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Public
export const createTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  }
);

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Public
export const updateTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  }
);

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Public
export const deleteTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);
