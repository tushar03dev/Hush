import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socketHandler";
import connectDB from "./config/db";
import chatRoutes from "./routes/chatRoutes";
import dotenv from "dotenv";
import {checkAdmin} from "./middleware/adminCheck";
import multer from "multer";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Setup WebSocket and RabbitMQ consumer
connectDB();
setupSocket(io);

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads

// Middleware to handle form-data
const upload = multer(); // You can configure multer to store files if needed

// Middleware to parse form-data
app.use(upload.none()); // This is used when you're not uploading any files, just data

app.use('/admin',checkAdmin);
app.use('/chat',chatRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Chat Server running on http://localhost:${ process.env.PORT }`);
});
