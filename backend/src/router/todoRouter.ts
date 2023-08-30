import * as todoController from "./../controller/todoController";
import express from "express";

const todoRouter = express.Router();

todoRouter.route('/').put(todoController.addATask);
todoRouter.route('/').get(todoController.getAllTask);
todoRouter.route('/:id').get(todoController.getATask);
todoRouter.route('/:id').delete(todoController.deleteATask);
todoRouter.route('/:id').patch(todoController.updateATask);

export default todoRouter;