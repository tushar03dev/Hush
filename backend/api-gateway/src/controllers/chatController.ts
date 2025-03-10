import axios from "axios";

const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL as string;

export async function sendMessageToChatService(message: any) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/chat/save-message`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}


