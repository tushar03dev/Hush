import Router from 'express';
//import {authenticateToken} from "../middleware/authMiddleware";
import {saveMessage} from "../controllers/chatController";
import {createChatroom, removeUser} from "../controllers/roomController";

const router = Router();

// Save Message
router.post('/save-message',saveMessage);
router.post('/create-room', createChatroom);
router.post('/remove',removeUser);
// router.post('/save-message',authenticateToken,saveMessage);

export default router;
