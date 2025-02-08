import {NextFunction, Request, Response} from 'express';
import {ChatRoom} from "../models/chatRoomModel";
import {encryptText} from "../utils/textEncryption";
import mongoose from "mongoose";
import * as fs from "node:fs";
import {encryptAudio, encryptMedia} from "../utils/avEncryption";
import {encryptImage} from "../utils/imageEncryption";
import {AuthRequest} from "../middleware/authenticateToken";


export const saveMessage = async(req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    const {roomId, timestamps, type, data} = req.body;
    if (!data) {
        res.status(400).send("No message found!");
        return;
    }

    const room = await ChatRoom.findById(roomId);
    if (!room) {
        res.status(400).send("No room found!");
        return;
    }

    const sender = await ChatRoom.findOne(roomId.participants);
    if (!sender) {
        res.status(400).send("You don't have access to this chat!");
        return;
    }

    try{
        const encryptFunctions = {
            text: encryptText,
            video: encryptMedia,
            audio: encryptAudio,
            image: encryptImage,
        } as const;

        if (type in encryptFunctions) {
            const encryptFn = encryptFunctions[type as keyof typeof encryptFunctions];
            const content = type === 'text' ? data : fs.readFileSync(data);

            const encryptionResult = encryptFn(content);

            room.chats.push({
                timestamps: new Date(),
                sender: req.user as unknown as mongoose.Types.ObjectId,
                dataType: type,
                encryptedContent: encryptionResult.encryptedData,
                iv: encryptionResult.iv,
                ...(type !== "text" ? { tag: (encryptionResult as { encryptedData: string; iv: string; tag: string }).tag } : {}),
            });

            await room.save();
            res.status(200).send(`${type.charAt(0).toUpperCase() + type.slice(1)} message saved!`);
            return;
        }
    } catch (error) {
        next(error);
    }
};