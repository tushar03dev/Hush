import {Response} from "express";
import axios from "axios";
import dotenv from "dotenv";
import {AuthRequest} from "../middleware/authMiddleware";
import {sendRequest} from "../config/rabbitmq";

dotenv.config();
const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL as string;

function extractUser(req: any) {
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

        // Check if userId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }

        // RPC Request
        const result = await sendRPCRequest("chat-service-queue", {
            type: "SEND_MESSAGE",
            payload: { userId, receiverId, roomId, type, data },
        });

        if (result.success) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for sending message:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

export async function getChat(req: AuthRequest, res: Response) {
    try {
        const {roomId, limit, skip} = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({success: false, error: "User not found"});
            return;
        }

        // RPC Request
        const result = await sendRPCRequest("chat-service-queue", {
            type: "GET_CHAT",
            payload: { userId, roomId, limit, skip },
        });

        if (result.success) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for retrieving chat:", error);
    }
}

export async function createRoom(req: AuthRequest, res: Response): Promise<void> {
    try {
        const {name, participants} = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({success: false, error: "User not found"});
            return;
        }

        // RPC Request
        const result = await sendRPCRequest("chat-service-queue", {
            type: "GET_CHAT",
            payload: { userId, name, participants },
        });

        if (result.success) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for creating room:", error);
    }
}

export async function getRooms(req: AuthRequest, res: Response): Promise<void> {
    try {
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({success: false, error: "User not found"});
            return;
        }

        // RPC Request
        const result = await sendRPCRequest("chat-service-queue", {
            type: "GET_ROOMS",
            payload: {userId},
        });

        if (result.success) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for retrieving rooms:", error);
    }
}


export async function addUser(req: AuthRequest, res: Response): Promise<void> {
    try {
        const {participant, roomId} = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({success: false, error: "User not found"});
            return;
        }

        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/add-user`, {participant, roomId}, {
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        if (response.data.success) {
            res.status(200).json({success: true, message: response.data});
        } else {
            res.status(500).json({success: false, error: "Failed to send message."});
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for adding user:", error);
    }
}

export async function removeUser(req: AuthRequest, res: Response): Promise<void> {
    try {
        const {participant, roomId} = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({success: false, error: "User not found"});
            return;
        }

        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/remove-user`, {participant, roomId}, {
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });
        if (response.data.success) {
            res.status(200).json({success: true, message: response.data});
        } else {
            res.status(500).json({success: false, error: "Failed to send message."});
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for removing user:", error);
    }
}

export async function addAdmin(req: AuthRequest, res: Response) {
    try {
        const {participant, roomId} = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({success: false, error: "User not found"});
            return;
        }

        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/add-admin`, {participant, roomId}, {
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });

        if (response.data.success) {
            res.status(200).json({success: true, message: response.data});
        } else {
            res.status(500).json({success: false, error: "Failed to send message."});
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for adding admin:", error);
    }
}

export async function removeAdmin(req: AuthRequest, res: Response) {
    try {
        const {participant, roomId} = req.body;
        const userId = extractUser(req);

        // check if UserId exists
        if (!userId) {
            res.status(401).json({success: false, error: "User not found"});
            return;
        }

        const response = await axios.post(`${CHAT_SERVICE_URL}/admin/remove-admin`, {participant, roomId}, {
            headers: {
                "user-id": userId // Pass userId in headers
            }
        });

        if (response.data.success) {
            res.status(200).json({success: true, message: response.data});
        } else {
            res.status(500).json({success: false, error: "Failed to send message."});
        }
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service for removing admin:", error);
    }
}
