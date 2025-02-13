import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/protected", authenticateUser, (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
});

export default router;

