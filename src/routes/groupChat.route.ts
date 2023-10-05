import { Router } from "express";
import {
  createGroup,
  getGroups,
  joinGroup,
} from "../controllers/groupChat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router
  .get("/get_groups", authMiddleware, getGroups)
  .post("/create_group", authMiddleware, createGroup)
  .post("/join_group", authMiddleware, joinGroup);

export default router;
