import { Router } from "express";
import { login, logout, signUp } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signUp).post("/login", login).delete("/logout", logout);

export default router;
