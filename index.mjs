import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import fundRoutes from './routes/fundRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/fund', fundRoutes);

mongoose.connect(process.env.DB_URI)
    .then(() =>{
        app.listen(process.env.PORT || 3000,() =>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(err=>{
        console.error('Database connection error:', err);
    })