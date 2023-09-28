import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import 'dotenv/config';
// MIDDLEWARES
app.use(cookieParser()); // for req.cookies
app.use(express.json()); // for req.body
// IMPORT ROUTE HANDLERS
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
// ROUTE HANDLERS
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));
