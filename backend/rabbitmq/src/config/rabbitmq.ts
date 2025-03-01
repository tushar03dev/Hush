import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export class RabbitMQ {
    private static connection: amqp.Connection;
    private static channel: amqp.Channel;

    // Establish connection and channel
    public static async connect(): Promise<void> {
        if (!this.connection || !this.channel) {
            try {
                this.connection = await amqp.connect(RABBITMQ_URL);
                this.channel = await this.connection.createChannel();
                console.log('[RabbitMQ] Connected to', RABBITMQ_URL);
            } catch (error) {
                console.error('[RabbitMQ] Connection failed:', error);
                process.exit(1);
            }
        }
    }

    // Get channel instance
    public static getChannel(): amqp.Channel {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized. Call RabbitMQ.connect() first.');
        }
        return this.channel;
    }

    // Publish messages to a queue
    public static async publish(queue: string, message: any): Promise<void> {
        try {
            const channel = this.getChannel();
            await channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
            console.log(`[RabbitMQ] Sent message to ${queue}:`, message);
        } catch (error) {
            console.error(`[RabbitMQ] Failed to send message to ${queue}:`, error);
        }
    }

    // Consume messages from a queue
    public static async consume(queue: string, callback: (msg: any) => void): Promise<void> {
        try {
            const channel = this.getChannel();
            await channel.assertQueue(queue, { durable: true });
            channel.consume(queue, (msg) => {
                if (msg) {
                    const messageContent = JSON.parse(msg.content.toString());
                    console.log(`[RabbitMQ] Received from ${queue}:`, messageContent);
                    callback(messageContent);
                    channel.ack(msg); // Acknowledge processing
                }
            });
        } catch (error) {
            console.error(`[RabbitMQ] Failed to consume from ${queue}:`, error);
        }
    }

    // Graceful shutdown
    public static async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            console.log('[RabbitMQ] Connection closed.');
        }
    }
}
