import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {IUser, User} from '../models/userModel';

dotenv.config();

// Extend Express Request type to include `userId`
export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    const token = req.headers['authorization'];

    // Check if token is missing
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {email: string};
        if (!decoded.email) {
            res.status(400).json({ message: "Invalid token: No email found" });
            return;
        }

        // Find the user by email
        const user: IUser | null = await User.findOne({ email: decoded.email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        req.userId = decoded.email;
        res.json({ userId: req.userId });
    } catch (err) {
        const error = err as Error;
        if (error.name === 'TokenExpiredError') {
            res.status(403).json({ message: 'Token expired.' });
        }

        console.error('Token verification error:', error);  // Log the error for debugging
        res.status(403).json({ message: 'Invalid token.' });
    }
};
