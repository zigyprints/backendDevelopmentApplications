// const taskController = requrie('./taskController.js');

const express = require("express");
const taskController = require("./taskController");

const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTask)
  .post(taskController.createTask);

router
  .route("/:id")
  .get(taskController.getTask)
  .delete(taskController.deleteTask)
  .patch(taskController.updateTask);

module.exports = router;