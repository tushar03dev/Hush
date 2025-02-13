import { Room } from "../models/chatRoomModel";
import { connectRabbitMQ, rabbitChannel } from "../config/rabbitmq";

const startWorker = async () => {
    await connectRabbitMQ();

    if (!rabbitChannel) return;

    rabbitChannel.consume("chatMessages", async (msg) => {
        if (msg) {
            const messageData = JSON.parse(msg.content.toString());
            console.log("📥 Processing Message:", messageData);

            await Room.updateOne(
                { _id: messageData.roomId },
                { $push: { chats: messageData } }
            );

            rabbitChannel.ack(msg);
        }
    });

    console.log("RabbitMQ Worker Started");
};

startWorker();
