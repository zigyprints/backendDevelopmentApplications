import authMiddleware from "../middleware/auth.middleware.js";
import { Router } from "express";
import {
  createMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

const router = Router();

router
  .post("/send_message", authMiddleware, createMessage)
  .delete("/delete_message", authMiddleware, deleteMessage);

export default router;
