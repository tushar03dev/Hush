import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost";

export async function publishToQueue(queue: string, message: object) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log(`📤 Sent message to ${queue}:`, message);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("❌ RabbitMQ Publish Error:", error);
    }
}
