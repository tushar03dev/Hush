import Router from 'express';
import {getChatMessages, saveMessage} from "../controllers/chatController";
import {createChatroom, getRooms} from "../controllers/roomController";

const router = Router();

// Save Message
router.post('/save-message',saveMessage);
router.post('/create-room', createChatroom);
router.post('/get-rooms', getRooms);
router.post('/get-chat',getChatMessages);

export default router;
