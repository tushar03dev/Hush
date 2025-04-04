import { Server } from "socket.io";
import http from "http";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { User } from "./models/userModel";
import dotenv from "dotenv";

dotenv.config();

const API_GATEWAY_URL = process.env.API_GATEWAY_URL;
const SOCKET_PORT = process.env.SOCKET_PORT;
const activeUsers = new Map<string, string>(); // Maps userId -> socketId

export function startSocketServer() {
    const server = http.createServer();
    const io = new Server(server, {
        cors: {
            origin: `${API_GATEWAY_URL}`,
        },
    });

    const pubClient = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        console.log("WebSocket server started with Redis Adapter.");
    });

    // Handle WebSocket connections
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("authenticate", async ({ userId }) => {
            console.log(`User ${userId} authenticated with socket ${socket.id}`);

            // Verify user exists
            const user = await User.findById(userId);
            if (!user) {
                return socket.emit("error", "User not found");
            }

            activeUsers.set(userId, socket.id);
            socket.join(userId); // User joins their personal room

            // Notify frontend that authentication is complete
            socket.emit("authenticated", { success: true });
        });

        // Handle private messages
        socket.on("sendMessage", async ({ roomId, message }) => {
            const userId = Array.from(activeUsers.entries()).find(([key, value]) => value === socket.id)?.[0];

            if (!userId) {
                return socket.emit("error", "User not authenticated");
            }

            io.to(roomId).emit("receiveMessage", { roomId, message, sender: userId });
            // save messages logic should come here under
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
            activeUsers.forEach((value, key) => {
                if (value === socket.id) {
                    activeUsers.delete(key);
                }
            });
        });
    });

    server.listen(SOCKET_PORT, () => {
        console.log(`WebSocket server running on port ${SOCKET_PORT}`);
    });
}
