import process from 'process'; // Explicitly imports the process runtime context
import dotenv from 'dotenv';
dotenv.config(); // Runs configuration before ANYTHING else imports database variables

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Connect to Cloud Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Api Middleware
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Server status fallback route
app.get('/', (req, res) => {
    res.send('AUREX Protected Task Manager API Server is Active...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🛰️  Secure server running successfully on port ${PORT}`);
});
