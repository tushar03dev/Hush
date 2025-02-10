import express from 'express';
import {Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import multer from 'multer';
import {consumeFromQueue} from "./rabbitmq";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Middleware to handle form-data
const upload = multer();
app.use(upload.none());

// MongoDB Connection
connectDB();

// Listen for incoming messages from RabbitMQ
consumeFromQueue("chatQueue", async (msg) => {
    console.log("Processing message from RabbitMQ:", msg);

    // Save message to MongoDB
    const newMessage = new Message({
        sender: msg.senderId,
        roomId: msg.roomId,
        content: msg.content,
    });

    await newMessage.save();

    // Emit message to all clients in the room
    io.to(msg.roomId).emit("receiveMessage", msg);
});

//Error-handling middleware
app.use((err: any, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
