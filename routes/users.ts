import express, { Router } from "express";
import { login, register } from "../controllers/users";
import { loginValidation, registerValidation } from "../middleware/validation";

// initialising and exporting routers
export const router: Router = express.Router();

// routes

// loging route
router.post("/login", loginValidation, login);
// register route
router.post("/register", registerValidation, register);
