import {DefaultEventsMap, Server, Socket} from "socket.io";
import * as http from "node:http";

let io: Server;

export function setupSocket(server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

    io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins (Modify for security)
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
