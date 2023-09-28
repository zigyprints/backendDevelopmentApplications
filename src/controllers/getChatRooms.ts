import { Request, Response} from "express"
import chatrooms from "../chatRooms.js"

const getChatRooms = (req:Request, res:Response)=> {
    const rooms = chatrooms.map(room=> room.name);
    res.status(200).send(rooms);
};

export default getChatRooms;