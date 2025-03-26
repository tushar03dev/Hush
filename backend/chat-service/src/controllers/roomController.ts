import {Room} from "../models/roomModel";
import {Request, Response, NextFunction} from "express";
import {User} from "../models/userModel";
import {decryptText} from "../utils/textEncryption";
import mongoose from "mongoose";


export const createChatroom = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        // Extract user email from headers
        const userEmail = req.headers["user-id"];
        if (!userEmail || typeof userEmail !== "string") {
            res.status(400).send({ success: false, error: "Unauthorized: Email not provided." });
            return;
        }

        // Fetch sender (user) ID from the database using email
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            res.status(404).send({ success: false, error: "User not found." });
            return;
        }

        const userId = user._id; // MongoDB ID of sender
        let { name, participants } = req.body;

        if (!name || !Array.isArray(participants)) {
            res.status(400).json({ error: "Invalid input: name and participants are required" });
            return;
        }

        if (participants.length < 2) {
            res.status(400).json({ error: "At least two participants are required" });
            return;
        }

        // Correctly extract user IDs
        const userIds = (await Promise.all(
            participants.map(async (participant: string) => {
                const foundUser = await User.findOne({ email: participant }, { _id: 1 });
                return foundUser ? foundUser._id : null;
            })
        )).filter(id => id !== null);

        if (userIds.length !== participants.length) {
            res.status(400).json({ success: false, error: "One or more users not found" });
            return;
        }

        const newRoom = new Room({
            name: name,
            isGroup: true,
            members: userIds,
            admins: [userId],
        });

        const room = await newRoom.save();

        // Correct iteration using `for...of`
        for (const memberId of userIds) {
            await User.findByIdAndUpdate(memberId, {
                $push: { rooms: room._id }
            });
        }

        res.status(201).json({ success: true, newRoom });
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
        await room.update({$pull: { members: participantId }});
        await User.findByIdAndUpdate(participantId, {
            $pull: {rooms: room._id}
        })
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
        await room.update({$push: { members: participantId }});
        await User.findByIdAndUpdate(participantId, {
            $push: {rooms: room._id}
        })
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


export const getRooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract user email from headers
        const userEmail = req.headers["user-id"];
        if (!userEmail || typeof userEmail !== "string") {
            res.status(400).send({success: false, error: "Unauthorized: Email not provided."});
            return;
        }

        // Fetch sender (user) ID from the database using email
        const user = await User.findOne({email: userEmail});
        if (!user) {
            res.status(404).send({success: false, error: "User not found."});
            return;
        }

        if (!user.rooms || user.rooms.length === 0) {
            res.status(404).json({ message: "User has no rooms" });
            return;
        }

        // Fetch rooms where the user is a member, sorted by most recent chat
        const rooms = await Room.aggregate([
            { $match: { _id: { $in: user.rooms } } },
            {
                $addFields: {
                    latestChat: { $arrayElemAt: ["$chats", -1] } // Get latest chat message
                }
            },
            { $sort: { "latestChat.timestamps": -1 } }, // Sort by latest chat time
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "membersData"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "admins",
                    foreignField: "_id",
                    as: "adminsData"
                }
            },
            {
                $project: {
                    name: 1,
                    isGroup: 1,
                    membersEmails: {
                        $map: {
                            input: "$membersData",
                            as: "member",
                            in: {
                                email: "$$member.email",
                                name: "$$member.name",
                                photo: "$$member.photo"
                            }
                        }
                    },
                    adminsEmails: {
                        $map: {
                            input: "$adminsData",
                            as: "admin",
                            in: {
                                email: "$$admin.email",
                                name: "$$admin.name",
                                photo: "$$admin.photo"
                            }
                        }
                    },
                    latestChat: 1 // Keep encrypted content as is for now
                }
            }
        ]);

       // Decrypt after fetching
        rooms.forEach((room) => {
            if (room.latestChat?.dataType === "text") {
                room.latestChat.decryptedContent = decryptText(
                    room.latestChat.encryptedContent,
                    room.latestChat.iv,
                );
            }
        });


        res.status(200).json({success:true,rooms});
    } catch (error) {
        next(error);
    }
};

