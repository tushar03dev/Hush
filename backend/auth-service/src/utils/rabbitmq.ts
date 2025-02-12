import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

async function setupRabbitMQ() {
    if (!connection) {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("✅ RabbitMQ Connected & Channel Created");
    }
    return channel;
}

export async function publishToQueue(queue: string, message: object) {
    try {
        if (!channel) {
            channel = await setupRabbitMQ(); // Ensure channel exists
        }
        if (!channel) throw new Error("Channel is still null after setup.");

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log(`📨 Sent message to ${queue}:`, message);
    } catch (error) {
        console.error("❌ RabbitMQ Publish Error:", error);
    }
}

// Ensure setup on startup
setupRabbitMQ().catch((err) => console.error(" RabbitMQ Setup Failed:", err));
