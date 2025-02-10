import  { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';
import dotenv from 'dotenv';
import {sendOTP, verifyOTP} from "./otpController";
import {generateName} from "../utils/nameGenerator";
import {publishToQueue} from "../utils/rabbitmq";
import {Session} from "../models/sessionModel";

dotenv.config();

let tempUser: any; // Temporary storage for user details

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Check if all required fields are present
    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists.');
        }

        // Temporarily store the user details (before OTP verification)
        const name = generateName();
        console.log(`Your new generated name: ${name}`);
        tempUser = { name, email, password };

        // Send OTP
        const otpToken = await sendOTP(email); // Call sendOTP directly
        return res.status(200).json({ otpToken, message: 'OTP sent to your email. Please enter the OTP to complete sign-up.' });

    } catch (err) {
        next(err);
    }
};

export const completeSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const { otpToken, otp } = req.body;

    if (!otpToken || !otp) {
        res.status(400).json({ message: 'Token and OTP are required.' });
        return;
    }

    try {
        // Call the verifyOTP function and capture its response
        const otpVerificationResult = await verifyOTP(otpToken, otp);

        // If OTP verification was successful, proceed with account creation
        if (otpVerificationResult.success) {
            if (!tempUser) {
                return res.status(400).json({ message: 'No user details found for OTP verification.' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(tempUser.password, salt);

            // Create the new user
            const user = new User({ name: tempUser.name, email: tempUser.email, password: hashedPassword });
            await user.save();

            // Clear the tempUser once sign-up is complete
            tempUser = null;

            // Generate JWT token
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

            // Store session in DB
            await Session.updateOne(
                { userId: user._id },
                { $set: { token, updatedAt: new Date() } },
                { upsert: true }
            );

            // Publish session to RabbitMQ
            await publishToQueue("authQueue", { userId: user._id, token });

            // Respond with token and success message
            res.status(201).json({ token, message: 'User signed up successfully.' });
        } else {
            // OTP verification failed
            res.status(400).json({ message: otpVerificationResult.message });
        }
    } catch (err) {
        next(err);
    }
};


export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send('User does not exist.');
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send('Invalid password');
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        // Store session in DB
        await Session.updateOne(
            { userId: user._id },
            { $set: { token, updatedAt: new Date() } },
            { upsert: true }
        );

        // Publish to RabbitMQ queue
        await publishToQueue("authQueue", { userId: user._id, token });

        res.json({ token });
        return;
    } catch (err) {
        next(err);
    }
};



