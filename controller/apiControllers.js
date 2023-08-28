const mongoose = require("mongoose");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const taskName = req.body.taskName;
    if (taskName) {
      const task = await Task.create({ taskName });
      res
        .status(201)
        .json({
          success: true,
          message: "Task created successfully",
           task,
        });
    } else {
      res.status(500).json({
        success: false,
        message: "Task Name invaild",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task Creation failed",
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id, taskName } = req.body;
    const taskId = new mongoose.Types.ObjectId(id);

    if (taskName) {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { taskName },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({
          success: true,
          message: "Task updated successfully",
          task,
        });
    } else {
      res.status(500).json({
        success: false,
        message: "Task Name invaild",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task updation failed",
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const taskId = new mongoose.Types.ObjectId(id);

    if (id) {
      const task = await Task.findByIdAndDelete(taskId);
      res
        .status(200)
        .json({
          success: true,
          message: "Task deleted successfully",
          task,
        });
    } else {
      res.status(500).json({
        success: false,
        message: "Task id invaild",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task deletion failed",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res
      .status(201)
      .json({ success: true, message: "Task fetching successful",  tasks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task fetching failed",
    });
  }
};
module.exports = { createTask, updateTask, deleteTask, getAllTasks };
