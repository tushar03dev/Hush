import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socketHandler";
import { chatConsumer } from "./consumers/chatConsumer";
import connectDB from "./config/db";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Setup WebSocket and RabbitMQ consumer
connectDB();
setupSocket(io);
chatConsumer(io);

server.listen(5201, () => {
    console.log("🚀 Server running on http://localhost:5201");
});
