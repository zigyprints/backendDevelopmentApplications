import { Router } from "express";
import postLogin from "../controllers/postLogin.js";
import postSignup from "../controllers/postSignup.js";
const authRouter = Router();
authRouter.post("/signup", postSignup);
authRouter.post("/login", postLogin);
export default authRouter;
