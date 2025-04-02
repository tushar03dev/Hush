import express from "express";
import {
    addAdmin,
    addUser, createRoom,
    getChat, getRooms,
    removeAdmin,
    removeUser,
    sendMessageToChatService
} from "../controllers/chatServiceController";
import {authenticateToken} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send",authenticateToken,sendMessageToChatService);

router.post("/create-room",authenticateToken,createRoom);

router.post("/get-chat",authenticateToken,getChat);

router.post("/get-rooms",authenticateToken,getRooms);

router.post("/add-user",authenticateToken,addUser);

router.post("/remove-user",authenticateToken,removeUser);

router.post("/add-admin",authenticateToken,addAdmin);

router.post("/remove-admin",authenticateToken,removeAdmin);

export default router;


