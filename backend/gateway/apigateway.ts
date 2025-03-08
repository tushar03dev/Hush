import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5000";

app.post("/process-message", async (req, res) => {
    try {
        const chatMessage = req.body;
        console.log("[API Gateway] Received message:", chatMessage);

        // Forward message to Notification Service
        await axios.post(`${NOTIFICATION_SERVICE_URL}/queue-message`, chatMessage);

        res.json({ success: true, message: "Message forwarded to Notification Service" });
    } catch (error) {
        console.error("[API Gateway] Error forwarding message:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(4000, () => console.log("[API Gateway] Running on port 4000"));
