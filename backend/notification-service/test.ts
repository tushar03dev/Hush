import express from "express";
import { publishToQueue } from "./rabbitmq";

const app = express();
app.use(express.json());

app.post("/queue-message", async (req, res) => {
    try {
        const chatMessage = req.body;
        console.log("[Notification Service] Received message:", chatMessage);

        // Push message to RabbitMQ queue
        await publishToQueue("notificationQueue", chatMessage);

        res.json({ success: true, message: "Message added to queue" });
    } catch (error) {
        console.error("[Notification Service] Error queuing message:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(5000, () => console.log("[Notification Service] Running on port 5000"));
