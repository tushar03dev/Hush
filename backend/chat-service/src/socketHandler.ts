import { Server, Socket } from "socket.io";
import { publishToQueue } from "./config/rabbitmq";

const connectedUsers = new Map<string, string>(); // userId -> socketId mapping

export function setupSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        console.log("New User Connected:", socket.id);

        // Register User
        socket.on("register", (userId: string) => {
            connectedUsers.set(userId, socket.id);
            console.log(`User ${userId} registered with Socket ID ${socket.id}`);
        });

        // Handle chat messages
        socket.on("send_message", async ({ senderId, receiverId, message }) => {
            console.log(`Message from ${senderId} to ${receiverId}: ${message}`);

            const chatMessage = { senderId, receiverId, message, timestamp: new Date() };

            // Publish message to RabbitMQ
            await publishToQueue("chatQueue", chatMessage);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            connectedUsers.forEach((socketId, userId) => {
                if (socketId === socket.id) {
                    connectedUsers.delete(userId);
                    console.log(`User ${userId} disconnected`);
                }
            });
        });
    });
}
