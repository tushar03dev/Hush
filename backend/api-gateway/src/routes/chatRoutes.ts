import express, { Request, Response } from "express";
import {addAdmin, addUser, removeAdmin, removeUser, sendMessageToChatService} from "../controllers/chatController";
import {authenticateToken} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send",authenticateToken, async (req: Request, res: Response) => {
    try {
        const { roomId, timestamps, type, data } = req.body;

        // Forward the request to the Chat Service
        const response = await sendMessageToChatService({ roomId, timestamps, type, data });

        if (response.success) {
            res.status(200).json({ success: true, message: "Message processed successfully." });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/add-user",authenticateToken, async (req: Request, res: Response) => {
    try {
        // Forward the request to the Chat Service
        const response = await addUser(req.body);

        if (response.success) {
            res.status(200).json({ success: true, message: "Message processed successfully." });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/add-user",authenticateToken, async (req: Request, res: Response) => {
    try {
        // Forward the request to the Chat Service
        const response = await removeUser(req.body);

        if (response.success) {
            res.status(200).json({ success: true, message: "Message processed successfully." });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/add-admin",authenticateToken, async (req: Request, res: Response) => {
    try {
        // Forward the request to the Chat Service
        const response = await addAdmin(req.body);

        if (response.success) {
            res.status(200).json({ success: true, message: "Message processed successfully." });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/remove-admin",authenticateToken, async (req: Request, res: Response) => {
    try {
        // Forward the request to the Chat Service
        const response = await removeAdmin(req.body);

        if (response.success) {
            res.status(200).json({ success: true, message: "Message processed successfully." });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});



export default router;
