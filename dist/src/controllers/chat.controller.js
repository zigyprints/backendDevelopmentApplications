var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import Chat from "../models/Chat.js";
export function createChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const receiverId = req.body.reciever_id;
            const senderId = req.headers.authorization;
            if (!senderId) {
                return res.status(403).json({ message: "Forbidden: no authorization" });
            }
            if (!receiverId || receiverId.localeCompare(senderId) == 0) {
                return res.status(422).json({ message: "Unprocessable entity" });
            }
            const receiver = yield User.findById(receiverId);
            if (!receiver) {
                return res.status(404).json({ message: "Receiver not found" });
            }
            if (yield Chat.exists({
                participants: {
                    $all: [senderId, receiverId],
                },
            })) {
                return res.status(200).json({ message: "Chat already exists" });
            }
            const chat = new Chat({
                participants: [senderId, receiverId],
                author: senderId,
            });
            yield chat.save();
            return res.status(201).json({ chatId: chat.id });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
export function deleteChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chatId = req.query.chatId;
            const senderId = req.headers.authorization;
            if (!chatId) {
                return res.status(403).json({ message: "Unprocessable entity" });
            }
            const chat = yield Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ message: "Chat not found" });
            }
            if (!senderId || chat.author.toString().localeCompare(senderId) !== 0) {
                return res.status(403).json({ message: "No authorization" });
            }
            yield Chat.deleteOne({ id: chatId });
            return res.status(200).json({ message: "Chat deleted" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server error" });
        }
    });
}
//# sourceMappingURL=chat.controller.js.map