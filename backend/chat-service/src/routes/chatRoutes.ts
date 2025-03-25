import Router, {Request, Response,NextFunction} from 'express';
import {getChatMessages, readMessage, saveMessage} from "../controllers/chatController";
import {createChatroom, getRooms} from "../controllers/roomController";

const router = Router();


// Save Message
router.post('/save-message',saveMessage);

// create a group
router.post('/create-room', createChatroom);

// fetch list of chats
router.get('/get-rooms', getRooms);

// fetch list of messages in  a chat group
router.get('/get-chat',getChatMessages);

// update the read-by list
router.put('/read', readMessage);

export default router;
