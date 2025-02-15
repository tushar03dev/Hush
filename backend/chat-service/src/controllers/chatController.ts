import { Response, NextFunction } from "express";
import fs from "fs";
import { Room } from "../models/roomModel";
import { publishToQueue } from "../config/rabbitmq"; // RabbitMQ publisher
import { encryptText } from "../utils/textEncryption";
import { encryptMedia, encryptAudio } from "../utils/avEncryption";
import { encryptImage } from "../utils/imageEncryption";
import { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";

export const saveMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { roomId, timestamps, type, data } = req.body;

        if (!data) {
            res.status(400).send("No message found!");
            return;
        }

        // Validate Room
        const room = await Room.findById(roomId);
        if (!room) {
            res.status(404).send("No room found!");
            return;
        }

        // Validate Sender (Check if user is part of the room)
        if (!room.members.includes(req.user?._id as mongoose.Types.ObjectId)) {
            res.status(403).send("You don't have access to this chat!");
            return;
        }

        // Define Encryption Functions
        const encryptFunctions = {
            text: encryptText,
            video: encryptMedia,
            audio: encryptAudio,
            image: encryptImage,
        } as const;

        // Perform Encryption
        if (type in encryptFunctions) {
            const encryptFn = encryptFunctions[type as keyof typeof encryptFunctions];
            const content = type === "text" ? data : fs.readFileSync(data);

            const encryptionResult = encryptFn(content);

            // Construct Message Object
            const chatMessage = {
                roomId: room._id as mongoose.Types.ObjectId,
                timestamps,
                sender: req.user?._id as mongoose.Types.ObjectId,
                dataType: type,
                encryptedContent: encryptionResult.encryptedData,
                iv: encryptionResult.iv,
                ...(type !== "text" ? { tag: (encryptionResult as { encryptedData: string; iv: string; tag: string }).tag } : {}),
            };

            // Save Message to Database
            room.chats.push(chatMessage);
            await room.save();

            // Publish Message to RabbitMQ (chatQueue)
            await publishToQueue("chatQueue", chatMessage);

            // Send Response
            res.status(200).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} message saved & queued!` });
        } else {
            res.status(400).send("Invalid message type!");
        }
    } catch (error) {
        next(error);
    }
};
