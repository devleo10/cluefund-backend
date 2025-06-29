import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import fundRoutes from './routes/fundRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://cluefund.netlify.app',
  'https://cluefund.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/fund', fundRoutes);

if (!process.env.DB_URI) {
    console.error('DB_URI environment variable is not set!');
    process.exit(1);
}

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB successfully');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('Database connection error:', err);
});