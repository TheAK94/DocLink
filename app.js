import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import connectDB from './controllers/configDB.js';
connectDB();

const app = express();
const PORT = process.env.port || 3000;


app.get('/', async (req, res)=>{
    res.send('Hello World');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})