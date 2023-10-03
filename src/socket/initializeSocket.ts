import { Server, Socket } from "socket.io";
import { SocketEvent } from "./events.js";

export default function initializeSocket(io: Server) {
  io.on("connection", async (socket: Socket) => {
    const userId: string | undefined = socket.handshake.query.userId as string | undefined;

    if (!userId) {
      console.error("Missing userId in socket handshake query.");
      return;
    }

    socket.join(userId);
    socket.emit(SocketEvent.CONNECTED, `Welcome ${userId}`)

    socket.on(SocketEvent.HELLO, () => {
      socket.emit(SocketEvent.HELLO, "hello")
    })

    socket.on(SocketEvent.DISCONNECTED, () => {
      socket.leave(userId);
    });
  });
}
