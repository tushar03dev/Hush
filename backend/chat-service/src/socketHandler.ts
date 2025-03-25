import { Server as SocketIOServer, Socket } from "socket.io";
import * as http from "http";

let io: SocketIOServer;

export function setupSocket(server: http.Server) {
    io = new SocketIOServer(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("New User Connected:", socket.id);

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`[Socket.io] User joined room: ${roomId}`);
        });

        socket.on("disconnect", () => {
            console.log("[Socket.io] User disconnected:", socket.id);
        });
    });

    return io;
}

export { io };
