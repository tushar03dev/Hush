import express, { Request, Response } from "express";
import {
    addAdmin,
    addUser, createRoom,
    getChat, getRooms,
    removeAdmin,
    removeUser,
    sendMessageToChatService
} from "../controllers/chatServiceController";
import {authenticateToken, AuthRequest} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send",authenticateToken,sendMessageToChatService);

router.post("/create-room",authenticateToken,createRoom);

router.post("/get-chat",authenticateToken,getChat);

router.post("/get-rooms",authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        // check if user is defined
        if (!req.user) {
            res.status(401).json({ success: false, error: "Unauthorized: User not found in token." });
            return;
        }
        const userId = req.user.userId;

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }

        // Forward the request to the Chat Service
        const response = await getRooms(userId) as any;

        if (response.success) {
            res.status(200).json({ success: true, message: response});
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/add-user",authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        // check if user is defined
        if (!req.user) {
            res.status(401).json({ success: false, error: "Unauthorized: User not found in token." });
            return;
        }
        const userId = req.user.userId;

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }
        const {participant,roomId} = req.body;

        // Forward the request to the Chat Service
        const response = await addUser({participant,roomId},userId);

        if (response.success) {
            res.status(200).json({ success: true, message:response});
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error in adding user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/remove-user",authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        // check if user is defined
        if (!req.user) {
            res.status(401).json({ success: false, error: "Unauthorized: User not found in token." });
            return;
        }
        const userId = req.user.userId;

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }
        const {participant,roomId} = req.body;
        // Forward the request to the Chat Service
        const response = await removeUser({participant,roomId},userId);
        //console.log(response);
        if (response.success) {
            res.status(200).json({ success: true, message: response });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/add-admin",authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        // check if user is defined
        if (!req.user) {
            res.status(401).json({ success: false, error: "Unauthorized: User not found in token." });
            return;
        }
        const userId = req.user.userId;

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }
        const {participant,roomId} = req.body;
        // Forward the request to the Chat Service
        const response = await addAdmin({participant,roomId},userId);

        if (response.success) {
            res.status(200).json({ success: true, message: response });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/remove-admin",authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        // check if user is defined
        if (!req.user) {
            res.status(401).json({ success: false, error: "Unauthorized: User not found in token." });
            return;
        }
        const userId = req.user.userId;

        // check if UserId exists
        if (!userId) {
            res.status(401).json({ success: false, error: "User not found" });
            return;
        }

        const {participant,roomId} = req.body;
        console.log(req.body);
        // Forward the request to the Chat Service
        const response = await removeAdmin({participant,roomId},userId);

        if (response.success) {
            res.status(200).json({ success: true, message: response });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});




export default router;
