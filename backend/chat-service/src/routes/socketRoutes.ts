import { Router, Request, Response } from "express";
import { User } from "../models/userModel";
import { io } from "../socketHandler"; // Import WebSocket instance

const router = Router();

router.post("/connect", async (req: Request, res: Response) => {
    try {
        const userId = req.headers["user-id"] as string;

        if (!userId) {
            res.status(400).json({ success: false, error: "User ID missing" });
            return;
        }

        const user = await User.findOne({email:userId});
        if (!user) {
             res.status(404).json({ success: false, error: "User not found" });
             return;
        }

        // Emit an event to establish a WebSocket connection
        io.to(userId).emit("connectUser", { success: true, userId });

        res.json({ success: true, message: "WebSocket connection request received" });
        return;

    } catch (error) {
        console.error("[Chat Server] Error processing socket connection:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

export default router;
