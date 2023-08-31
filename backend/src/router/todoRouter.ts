import * as todoController from "./../controller/todoController";
import express from "express";

// Create a new Express router instance
const todoRouter = express.Router();

// Define routes and associate them with corresponding controller methods
todoRouter.route('/')
    .post(todoController.addATask)  // Endpoint to add a new task
    .get(todoController.getAllTask); // Endpoint to get all tasks

todoRouter.route('/:id')
    .get(todoController.getATask)    // Endpoint to get a specific task by ID
    .delete(todoController.deleteATask) // Endpoint to delete a task by ID
    .patch(todoController.updateATask); // Endpoint to update a task by ID

export default todoRouter;
