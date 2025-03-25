import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupSocket } from "./socketHandler";
import connectDB from "./config/db";
import chatRoutes from "./routes/chatRoutes";
import dotenv from "dotenv";
import { checkAdmin } from "./middleware/adminCheck";
import multer from "multer";

dotenv.config();
const app = express();
const server = createServer(app); // Create an HTTP server

// Pass the HTTP server to Socket.io
const io = new SocketIOServer(server, { cors: { origin: "*" } });

// Setup WebSocket and RabbitMQ consumer
connectDB();
setupSocket(server); // ✅ Pass `server` instead of `io`

// Middleware
app.use(express.json());

// Middleware to handle form-data
const upload = multer();
app.use(upload.none());

app.use('/admin', checkAdmin);
app.use('/chat', chatRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Chat Server running on http://localhost:${process.env.PORT}`);
});
