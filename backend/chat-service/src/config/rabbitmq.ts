import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

let rabbitChannel: amqp.Channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
        rabbitChannel = await connection.createChannel();
        await rabbitChannel.assertQueue("chatMessages", { durable: true });
        console.log("RabbitMQ Connected for Chat Service");
    } catch (error) {
        console.error("RabbitMQ Connection Failed for Chat Service", error);
        process.exit(1);
    }
};

export { connectRabbitMQ, rabbitChannel };
