import express from "express";
import {authenticateUser, AuthRequest} from "../middleware/authMiddleware";

const router = express.Router();

router.get("/protected", authenticateUser, (req: AuthRequest, res) => {
    res.json({ message: "You are authorized", user: req.userId });
});

export default router;

