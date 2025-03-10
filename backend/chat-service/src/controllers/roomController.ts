import {Room} from "../models/roomModel";
import {AuthRequest} from "../middleware/authMiddleware";
import {Response, NextFunction} from "express";

export const createChatroom = async(req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {name, participants} = req.body;

        if(!name) {
            res.status(400).json({error: "All fields are required"});
            return;
        }

        if(participants.length < 2) {
            res.status(400).json({error: "At least two participants are required"});
            return;
        }

        const userId = req.userId as string;

        const newRoom = new Room({
            name:name,
            isGroup:true,
            members: participants,
            admins: [userId],
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        next(error);
    }
};

export const removeUser = async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {participantId,roomId} = req.body;

        if(!participantId) {
            res.status(400).json({error: "participant ID is required"});
            return;
        }

        const room = await Room.findById(roomId);

        if(!room) {
            res.status(400).json({error: "Room does not exist"});
            return;
        }
        if(!room.members.includes(participantId)) {
            res.status(400).json({error: "Member does not exist in this group"});
            return;
        }

        await Room.findByIdAndUpdate(roomId,
            { $pull: { members: participantId } },
            { new: true}
        );
    } catch(error){
        next(error);
    }
}