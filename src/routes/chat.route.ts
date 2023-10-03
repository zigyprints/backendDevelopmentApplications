import { Router } from "express";
import { createChat, deleteChat } from "../controllers/chat.controller.js";

const router = Router();

router.post("/create_chat", createChat).delete("/delete_chat", deleteChat);

export default router;
