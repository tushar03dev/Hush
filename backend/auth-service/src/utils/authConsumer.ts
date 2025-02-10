import { connectRabbitMQ } from './rabbitmq';
import { Session } from '../models/sessionModel'; // Session Model for storing active users

async function startAuthConsumer() {
    const { channel } = await connectRabbitMQ("authQueue");

    await channel.consume("authQueue", async (msg) => {
        if (msg !== null) {
            const {userId, token} = JSON.parse(msg.content.toString());

            // Store session in MongoDB
            await Session.updateOne(
                {userId},
                {$set: {token, updatedAt: new Date()}},
                {upsert: true}
            );

            console.log(`✅Authenticated User Stored: ${userId}`);
            channel.ack(msg);
        }
    });
}

startAuthConsumer();
