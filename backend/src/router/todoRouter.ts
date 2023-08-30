import * as todoController from "./../controller/todoController";
import express from "express";

const todoRouter = express.Router();

todoRouter.route('/').get(todoController.getAllTask);

export default todoRouter;