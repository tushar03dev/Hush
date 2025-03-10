import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socketHandler";
import connectDB from "./config/db";
import chatRoutes from "./routes/chatRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Setup WebSocket and RabbitMQ consumer
connectDB();
setupSocket(io);

app.use('/chat',chatRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Chat Server running on http://localhost:${ process.env.PORT }`);
});
