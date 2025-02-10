import express from 'express';
import {Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import multer from 'multer';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Middleware to handle form-data
const upload = multer();
app.use(upload.none());

// MongoDB Connection
connectDB();

//Error-handling middleware
app.use((err: any, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
