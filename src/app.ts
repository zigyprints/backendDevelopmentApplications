import express, { Request, Response} from "express";
import cookieParser from "cookie-parser";
import 'dotenv/config';
export const app = express();
app.use(cookieParser());
app.use(express.json());

import postSignup from "./controllers/postSignup.js";
import postLogin from "./controllers/postLogin.js";
import getChatRooms from "./controllers/getChatRooms.js";
import userProtect from "./controllers/userProtect.js";
import chatRoom from "./controllers/chatRoom.js";



const authRouter = express.Router();
const userRouter = express.Router();
userRouter.use(userProtect);

app.use("/auth", authRouter);
app.use("/user", userRouter);

authRouter.post("/signup", postSignup);
authRouter.post("/login", postLogin);

userRouter.get('/chatrooms', getChatRooms);
userRouter.get("/:roomname", chatRoom);

app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));
