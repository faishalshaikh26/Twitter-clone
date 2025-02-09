import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB()
});