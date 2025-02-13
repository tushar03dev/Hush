import amqp from "amqplib";
import { User } from "../models/userModel";
import { Session } from "../models/sessionModel";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

const BATCH_SIZE = 50; // Number of users processed at once
const batch: any[] = [];
const redisClient = new Redis();

async function connectRabbitMQ() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("signupQueue", { durable: true });
    await channel.assertQueue("authQueue", { durable: true });
    return channel;
}

async function processSignups(channel: amqp.Channel) {
    await channel.consume("signupQueue", async (msg) => {
        if (!msg) return;
        const {name, email, password} = JSON.parse(msg.content.toString());

        // Check Redis cache for duplicate prevention
        if (await redisClient.get(email)) return channel.ack(msg);

        // Set a temporary flag in Redis to prevent duplicate processing
        await redisClient.set(email, "processing", "EX", 10);

        batch.push({
            name,
            email,
            password,
        });

        channel.ack(msg);

        if (batch.length >= BATCH_SIZE) {
            await insertBatch();
        }
    });
}

async function insertBatch() {
    if (batch.length === 0) return;
    try {
        await User.insertMany(batch, { ordered: false });
        console.log(`Inserted ${batch.length} users`);
    } catch (error) {
        console.error("Batch insert error:", error);
    }
    batch.length = 0;
}

async function processAuth(channel: amqp.Channel) {
    await channel.consume("authQueue", async (msg) => {
        if (!msg) return;
        const {userId, token} = JSON.parse(msg.content.toString());

        try {

            await Session.updateOne(
                {userId},
                {$set: {token, updatedAt: new Date()}},
                {upsert: true}
            );
            console.log(`Authenticated User Stored: ${userId}`);
        } catch (error) {
            console.error(" Session Store Error:", error);
        }

        channel.ack(msg);
    });

    console.log("Auth Consumer is running...");
}

export const authConsumer = async(): Promise<void> => {
    const channel = await connectRabbitMQ();
    await processSignups(channel);
    await processAuth(channel);
    setInterval(insertBatch, 4000); // Process any remaining batch users every 4 sec
};
