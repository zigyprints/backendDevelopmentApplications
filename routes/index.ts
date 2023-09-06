import express, { Router } from "express";
const router: Router = express.Router();
import { router as userRouter } from "./users";

router.use("/users", userRouter);

export default router;
