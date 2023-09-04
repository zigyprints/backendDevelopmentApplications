import express from 'express';
import {home} from "../controllers/index"

const router = express.Router();

router.get("/", home); // default route

export default router;