import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
} from "../controllers/tasks";

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).put(updateTask);

export default router;
