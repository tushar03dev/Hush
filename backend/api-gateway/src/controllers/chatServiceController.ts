import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import {AuthRequest} from "../middleware/authMiddleware";

dotenv.config();
const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL as string;

function extractUser(req : any) {
    // check if user is defined
    if (!req.user || !req.user.userId) {
        return null;
    }
    return req.user.userId;

}

export async function sendMessageToChatService(req: AuthRequest, res: Response): Promise<void> {
    try {
        const { receiverId, roomId, type, data } = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }

        const response = await axios.post(`${CHAT_SERVICE_URL}/chat/save-message`,{ receiverId,roomId, type, data },{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });

        if (response.data.success) {
            res.status(200).json({ success: true, message: response.data });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for sending message:", error);
        return;
    }
}

export async function getChat(req: AuthRequest, res: Response): Promise<void> {
    try {
        const { roomId, limit, skip } = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }

        const response = await axios.post(`${CHAT_SERVICE_URL}/chat/get-chat`,{ roomId, limit, skip },{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });

        if (response.data.success) {
            res.status(200).json({ success: true, message: response.data });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for retrieving chat:", error);
        return;
    }
}

export async function createRoom(req: AuthRequest, res: Response): Promise<void> {
    try{
        const { name, participants } = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }

        const response = await axios.post(`${CHAT_SERVICE_URL}/chat/create-room`,{ name, participants },{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        if (response.data.success) {
            res.status(200).json({ success: true, message: response.data });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    }catch(error){
        console.error("[API Gateway] Failed to reach Chat Service for creating room:", error);
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
        console.error("[API Gateway] Failed to reach Chat Service for retrieving rooms:", error);
        return;
    }
}


export async function addUser(message: any,userId: string) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/add-user`,message,{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for adding user:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}

export async function removeUser(message: any,userId:string) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/remove-user`,message,{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for removing user:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}

export async function addAdmin(message: any,userId:string) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/add-admin`,message,{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for adding admin:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}

export async function removeAdmin(message: any,userId:string) {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/remove-admin`,message,{
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for removing admin:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}
