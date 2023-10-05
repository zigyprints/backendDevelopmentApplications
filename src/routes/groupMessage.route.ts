import authMiddleware from "../middleware/auth.middleware.js";
import { Router } from "express";
import { sendMessage } from "../controllers/groupMessage.controller.js";

const router = Router();

router.post("/send_message", authMiddleware, sendMessage);

export default router;
