import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

//app config

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//intializing routes
app.get('/', (req, res) => {
    res.send('API is working');
});

app.listen(port, () => console.log('Server is running on port: ' + port));
