import Router from 'express';
import {saveMessage} from "../controllers/chatController";
import {createChatroom} from "../controllers/roomController";

const router = Router();

// Save Message
router.post('/save-message',saveMessage);
router.post('/create-room', createChatroom);

export default router;
