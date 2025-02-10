import {Server} from "socket.io";
import {createServer} from "http";
import {publishToQueue} from "./rabbitmq";
import express from "express";


const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
    }
});

io.on("connection", socket => {
    console.log("user connected ", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("sendMessage", async (data) => {
        console.log("Message received:", data);
        await publishToQueue("chatQueue", JSON.stringify(data)); // Send to RabbitMQ

        // Emit the message to all users in the room
        io.to(data.roomId).emit("receiveMessage", data);
    });
});

export {server, io};