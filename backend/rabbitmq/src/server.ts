import express from 'express';
import {Response} from 'express';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads

// Middleware to handle form-data
const upload = multer(); // You can configure multer to store files if needed

// Middleware to parse form-data
app.use(upload.none()); // This is used when you're not uploading any files, just data

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
