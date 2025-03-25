import {Request, Response, NextFunction} from "express";
import {Room} from "../models/roomModel";
import {User} from "../models/userModel";
import mongoose from "mongoose";

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
        const user = await User.findOne({email: userId});
        if(!user){
            res.status(404).json({error:"User not found"});
            return;
        }
        const id = user._id as mongoose.Types.ObjectId;

        if(!room.admins.includes(id)){
            res.status(404).json({error:"Doesn\'t have admin rights"});
            return;
        }
        req.body.room = room;
        next();
    } catch(error){
        next(error);
    }
}