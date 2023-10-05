import { Router } from "express";
import {
  createChat,
  deleteChat,
  getAllParticipants,
} from "../controllers/chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router
  .get("/participants", authMiddleware, getAllParticipants)
  .post("/create_chat", authMiddleware, createChat)
  .delete("/delete_chat", authMiddleware, deleteChat);

export default router;
