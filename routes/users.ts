import express, { Router } from "express";
import { login, register } from "../controllers/users";

// initialising and exporting routers
export const router: Router = express.Router();

// routes

// loging route
router.post("/login", login);
// register route
router.post("/register", register);
