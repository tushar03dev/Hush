import { rabbitChannel } from "../config/rabbitmq";

export const queueMessage = async (message: any) => {
    if (!rabbitChannel) {
        console.error("RabbitMQ channel not initialized for ChatService");
        return;
    }
    rabbitChannel.sendToQueue("chatMessages", Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log("Message Queued:", message);
};
