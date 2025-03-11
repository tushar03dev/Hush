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

export async function addUser(message: any) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/add-user`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}

export async function removeUser(message: any) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/remove-user`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}

export async function addAdmin(message: any) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/add-admin`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}

export async function removeAdmin(message: any) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/remove-admin`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}
