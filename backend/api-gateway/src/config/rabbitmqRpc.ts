import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const REPLY_QUEUE = process.env.RPC_REPLY_QUEUE || "apigateway-responses";

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

const pendingResponses = new Map<string, (data: any) => void>();

//Establishes RabbitMQ connection and channel
export async function setupRabbitMQ(): Promise<amqp.Channel> {
    if (channel) return channel;

    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertQueue(REPLY_QUEUE, { durable: false });

    console.log("RabbitMQ connected and RPC reply queue ready");

    channel.consume(REPLY_QUEUE, (msg) => {
        if (!msg) return;

        const correlationId = msg.properties.correlationId;
        const content = JSON.parse(msg.content.toString());

        const resolver = pendingResponses.get(correlationId);
        if (resolver) {
            resolver(content);
            pendingResponses.delete(correlationId);
        }

        channel!.ack(msg);
    });

    return channel;
}

/**
 * Sends a message to a queue and waits for a response (RPC-style)
 */
export async function sendRPCRequest<T>(
    targetQueue: string,
    message: any
): Promise<T> {
    const ch = await setupRabbitMQ();
    const correlationId = uuidv4();

    const payload = Buffer.from(JSON.stringify(message));

    const responsePromise = new Promise<T>((resolve) => {
        pendingResponses.set(correlationId, resolve);
    });

    ch.sendToQueue(targetQueue, payload, {
        replyTo: REPLY_QUEUE,
        correlationId,
        persistent: true,
    });

    return responsePromise;
}
