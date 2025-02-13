import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./config/db";
import { setupSocket } from "./sockets/socketHandler";
import { connectRabbitMQ } from "./config/rabbitmq";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

connectDB();
connectRabbitMQ();
setupSocket(io);

app.use("/api/auth", authRoutes);

server.listen(5000, () => console.log("Server running on port 5000"));
