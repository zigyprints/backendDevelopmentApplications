import { Router } from "express";
import getChatRooms from "../controllers/getChatRooms.js";
import chatRoom from "../controllers/chatRoom.js";
import userProtect from "../controllers/userProtect.js";
const userRouter = Router();
userRouter.use(userProtect);
userRouter.get('/chatrooms', getChatRooms);
userRouter.get("/:roomname", chatRoom);
export default userRouter;
