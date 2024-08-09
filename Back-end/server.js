import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';

//app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//intializing routes
app.use('/api/song', songRouter);
app.get('/', (req, res) => {
    res.send('API is working');
});

app.listen(port, () => console.log('Server is running on port: ' + port));
