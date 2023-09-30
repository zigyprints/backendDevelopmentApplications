import chatrooms from "../chatRooms.js";
const getChatRooms = (req, res) => {
    const rooms = chatrooms.map(room => room.name);
    res.status(200).send(rooms);
};
export default getChatRooms;
