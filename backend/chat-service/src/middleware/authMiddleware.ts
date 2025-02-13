import axios from 'axios';
import {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

// Extend Express Request type to include `userId`
export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1] as string;
    if (!token) {
        res.status(401).send({ message: 'Unauthorized: No token provided' });
        return;
    }

    try{
        const response = await axios.get(`${AUTH_SERVICE_URL}/auth/validate`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        req.userId = response.data.userId;
        next();
    } catch(err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
}