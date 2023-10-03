var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SocketEvent } from "./events.js";
import User from "../models/User.js";
export default function initializeSocket(io) {
    io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
        const userId = socket.handshake.headers.authorization;
        const user = yield User.findById(userId);
        if (!user) {
            console.error("Missing userId in socket handshake query.");
            return;
        }
        socket.join(user.id);
        socket.emit(SocketEvent.CONNECTED, `Welcome ${user.id}`);
        socket.on(SocketEvent.HELLO, () => {
            socket.emit(SocketEvent.HELLO, "hello");
        });
        socket.on(SocketEvent.DISCONNECTED, () => {
            socket.leave(user.id);
        });
    }));
}
//# sourceMappingURL=initializeSocket.js.map