import express, { Router } from "express";
import { getAll, create, update, discard } from "../controllers/todos";
import { authMiddleware } from "../middleware/auth";

// initialising and exporting routers
export const router: Router = express.Router();

// routes

// route to get list of all todo
router.get("/", authMiddleware, getAll);

// route to create new todo
router.post("/", authMiddleware, create);

//  route to upadate todo
router.put("/:id", authMiddleware, update);

// route to delete a todo
router.delete("/:id", authMiddleware, discard);
