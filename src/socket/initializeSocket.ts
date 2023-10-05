import { Server, Socket } from "socket.io";
import { SocketEvent } from "./events.js";
import User from "../models/User.js";
import { decodeToken } from "../utils/jwt.js";

export default function initializeSocket(io: Server) {
  io.on("connection", async (socket: Socket) => {
    const token: string | undefined =
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      socket.emit(SocketEvent.DISCONNECTED, "Unproccessable entity");
      socket.disconnect(true);
      return;
    }

    const user = await User.findById(decodeToken(token));

    if (!user) {
      socket.emit(SocketEvent.DISCONNECTED, "Resource not found");
      socket.disconnect(true);
      return;
    }

    socket.join(user.id);
    socket.emit(SocketEvent.CONNECTED, `Welcome ${user}`);

    socket.on(SocketEvent.HELLO, () => {
      socket.emit(SocketEvent.HELLO, "hello");
    });

    socket.on(SocketEvent.DISCONNECTED, () => {
      socket.leave(user.id);
    });
  });
}
