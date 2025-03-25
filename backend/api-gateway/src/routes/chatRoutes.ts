import express, { Request, Response } from "express";
import {addAdmin, addUser, removeAdmin, removeUser, sendMessageToChatService} from "../controllers/chatController";
import {authenticateToken, AuthRequest} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send",authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { receiverId, roomId, type, data } = req.body;
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
        const response = await sendMessageToChatService({ receiverId,roomId, type, data },userId) as any;

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
