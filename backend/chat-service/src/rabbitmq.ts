import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost"; // Use your RabbitMQ URL

async function connectRabbitMQ() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("chatQueue", { durable: true });
    console.log("Connected to RabbitMQ");
    return channel;
}

// Publish message to queue
export async function publishToQueue(queue: string, message: string) {
    const channel = await connectRabbitMQ();
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
}

export async function consumeFromQueue(queue: string, callback: (msg: any) => void) {
    const channel = await connectRabbitMQ();
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            callback(JSON.parse(msg.content.toString()));
            channel.ack(msg);
        }
    });
}
