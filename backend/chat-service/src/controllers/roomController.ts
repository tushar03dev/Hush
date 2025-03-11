import {Room} from "../models/roomModel";
import {Request, Response, NextFunction} from "express";

export const createChatroom = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try{
        const {name, participants, userId} = req.body;

        if(!name) {
            res.status(400).json({error: "All fields are required"});
            return;
        }

        if(participants.length < 2) {
            res.status(400).json({error: "At least two participants are required"});
            return;
        }

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

export const removeUser = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const{room,participantId} = req.body;
    if(!participantId) {
        res.status(400).json({error: "Participant ID is required"});
        return;
    }
    try{
        room.update({$pull: { members: participantId }});
        res.status(201).json({msg:"Successfully member kicked-out the room"});
    } catch(error){
        next(error);
    }
}

export const addUser = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const{room,participantId} = req.body;
    if(!participantId) {
        res.status(400).json({error: "Participant ID is required"});
        return;
    }
    try{
        room.update({$push: { members: participantId }});
        res.status(201).json({msg:"Successfully member inserted the room"});
    } catch(error){
        next(error);
    }
}

export const addAdmin = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const{room,participantId} = req.body;
    if(!participantId) {
        res.status(400).json({error: "Participant ID is required"});
        return;
    }
    try{
        room.update({$push: { admins: participantId }});
        res.status(201).json({msg:"Successfully member inserted the room"});
    } catch(error){
        next(error);
    }
}

export const removeAdmin = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const{room,participantId} = req.body;
    if(!participantId) {
        res.status(400).json({error: "Participant ID is required"});
        return;
    }
    try{
        room.update({$pull: { admins: participantId }});
        res.status(201).json({msg:"Successfully removed from admin status"});
    } catch(error){
        next(error);
    }
}