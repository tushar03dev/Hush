import Router from 'express';
import {authenticateToken} from "../middleware/authMiddleware";
import {saveMessage} from "../controllers/chatController";

const router = Router();

// Save Message
router.post('/save-message',authenticateToken,saveMessage);
