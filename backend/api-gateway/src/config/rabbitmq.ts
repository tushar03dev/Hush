import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

export async function connectRabbitMQ(): Promise<amqp.Channel> {
    if (channel) {
        return channel;
    }

    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();

        console.log("✅ Connected to RabbitMQ");

        // Optional: Close RabbitMQ gracefully when Node exits
        process.on("exit", async () => {
            try {
                await channel?.close();
                await connection?.close();
                console.log("Closed RabbitMQ connection gracefully");
            } catch (error) {
                console.error("Error closing RabbitMQ connection:", error);
            }
        });

        return channel;
    } catch (err) {
        console.error("RabbitMQ Connection Error:", err);
        throw err;
    }
}
