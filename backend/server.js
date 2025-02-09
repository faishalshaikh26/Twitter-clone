import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js'
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB()
});