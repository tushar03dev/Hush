import {Room} from "../models/roomModel";
import {AuthRequest} from "../middleware/authMiddleware";
import mongoose from "mongoose";


export const createChatroom = async(req: AuthRequest, res: Response) => {
    const {room, participants} = req.body;
    // @ts-ignore
    const userId = req.userId as mongoose.Types.ObjectId;

    try{
        const newRoom = new Room({
            roomId: room.id,
            participants: participants,
            admins: userId,
            chats:[]
        });

        await newRoom.save();
    }
}