import axios from "axios";
import dotenv from "dotenv";
import {IUser} from "../models/userModel";
dotenv.config();
const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL as string;

export async function sendMessageToChatService(message: any, userId: string): Promise<void> {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/chat/save-message`, message,{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return;
    }
}

export async function getChat(message: any, userId: string): Promise<void> {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/chat/get-chat`, message,{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return;
    }
}

export async function getRooms( userId: string): Promise<void> {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/chat/get-rooms`,{},{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return;
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
