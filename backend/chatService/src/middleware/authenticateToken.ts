import axios from 'axios';
import {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

// Extend Express Request type to include `userId`
export interface AuthRequest extends Request {
    userId?: mongoose.Types.ObjectId;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[0] as string;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized: No token provided' })
    }

    try{
        const response = await axios.get(`${AUTH_SERVICE_URL}/auth/validate`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        req.user = response.data.user;
        next();
    } catch(err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}