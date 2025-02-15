import amqp from "amqplib";
import { Server } from "socket.io";
import Redis from "ioredis";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const redisClient = new Redis();
let channel: amqp.Channel | null = null;

async function connectRabbitMQ() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("chatQueue", { durable: true });
    return channel;
}

export async function chatConsumer(io: Server) {

    const channel = await connectRabbitMQ();
    await channel.consume("chatQueue", async (msg) => {
        if (!msg) return;

        const message = JSON.parse(msg.content.toString());
        console.log("Received from RabbitMQ:", message);

        // Check Redis cache for duplicate prevention
        const messageKey = `msg:${message.senderId}:${message.timestamp}`;
        if (await redisClient.get(messageKey)) return channel.ack(msg);

        // Store message in Redis temporarily
        await redisClient.set(messageKey, "processed", "EX", 10);

        // Emit message to receiver
        io.to(message.receiverId).emit("receive_message", message);

        channel.ack(msg);
    });
}