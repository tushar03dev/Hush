import amqp from "amqplib";
import { Room } from "../models/roomModel";

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;

async function consumeMessages() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue("chatQueue", { durable: true });

        console.log("[Batch Processor] Waiting for messages...");

        let messages: any[] = [];

        setInterval(async ():Promise<void> => {
            if (messages.length > 0) {
                console.log(`[Batch Processor] Saving ${messages.length} messages to DB...`);

                const groupedMessages: { [key: string]: any[] } = {};

                // Group messages by roomId
                messages.forEach((msg) => {
                    if (!groupedMessages[msg.roomId]) {
                        groupedMessages[msg.roomId] = [];
                    }
                    groupedMessages[msg.roomId].push({
                        sender: msg.sender,
                        message: msg.message,
                        timestamp: msg.timestamp,
                    });
                });

                // Save all messages to their respective rooms
                for (const roomId in groupedMessages) {
                    await Room.findOneAndUpdate(
                        { roomId },
                        { $push: { chats: { $each: groupedMessages[roomId] } } },
                        { upsert: true, new: true }
                    );
                }

                console.log(`[Batch Processor] Saved ${messages.length} messages successfully.`);
                messages = [];
            }
        }, 10000); // Process messages every 10 seconds

        channel.consume("chatQueue", (msg) => {
            if (msg) {
                const messageContent = JSON.parse(msg.content.toString());
                messages.push(messageContent);
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error("[Batch Processor] Error:", error);
    }
}

consumeMessages();
