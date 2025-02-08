import {NextFunction, Request, Response} from 'express';
import {ChatRoom} from "../models/chatRoomModel";
import {encryptText} from "../utils/encryptDecrypt";


export const chatPost = async(req: Request, res: Response, next: NextFunction) => {
    const {roomId, timestamps, type, data} = req.body;
    if (!data) {
        return res.status(400).send("No message found!");
    }

    const room = await ChatRoom.findById(roomId);
    if (!room) {
        return res.status(400).send("No room found!");
    }

    const sender = await ChatRoom.findOne(roomId.participants);
    if (!sender) {
        return res.status(400).send("You don't have access to this chat!");
    }

    if(type === "text") {
        const encryptedContent = encryptText(data);
        
    }




};