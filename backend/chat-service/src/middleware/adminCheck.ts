import {Request, Response, NextFunction} from "express";
import {Room} from "../models/roomModel";

export const checkAdmin = async(req:Request,res:Response,next: NextFunction):Promise<void>=>{
    const {roomId, userId} = req.body;
    if(!roomId || !userId){
        res.status(500).json({error:"All fields are required"});
        return;
    }
    try {
        const room = await Room.findById(roomId);
        if(!room){
            res.status(404).json({error:"Room not found"});
            return;
        }
        if(!room.admins){
            res.status(404).json({error:"No Admins found"});
            return;
        }
        if(!room.admins.includes(userId)){
            res.status(404).json({error:"Doesn\'t have admin rights"});
            return;
        }
        req.body.room = room;
        next();
    } catch(error){
        next(error);
    }
}