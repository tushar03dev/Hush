import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { queueMessage } from "../services/chatService";

interface UserPayload {
    userId: string;
}

export const setupSocket = (io: Server) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Authentication error"));

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
            socket.data.userId = decoded.userId;
            next();
        } catch (error) {
            next(new Error("Invalid token"));
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log(`User Connected: ${socket.data.userId}`);

        socket.on("joinRoom", (roomId: string) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });

        socket.on("sendMessage", (data) => {
            io.to(data.roomId).emit("receiveMessage", data);
            queueMessage(data);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected");
        });
    });
};
