import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

// change to RPC complete code
const RABBITMQ_URL = process.env.RABBITMQ_URL as string;

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

export const sendRequest = async(message:any) =>{
    const connection =     await amqp.connect(RABBITMQ_URL);
    const channel  = await connection.createChannel();

    const exchange = "request_exchange";
    const routingKey = "routingKey";

    await channel.assertExchange(exchange,"direct",{durable:true});
    await channel.publish(exchange,routeKey,Buffer.from(JSON.stringify(message)));

    console.log(`Message sent with routing key: ${routeKey}`);

}
