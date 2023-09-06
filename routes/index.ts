import express, { Router } from "express";
// importing routers
import { router as userRouter } from "./users";
import { router as todoRouter } from "./todos";

// initializing router
const router: Router = express.Router();

// regsitering routers
router.use("/users", userRouter);
router.use("/todos", todoRouter);

// exporting router
export default router;
