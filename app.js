import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';

import userRoute from './routes/userRouter.js';
import doctorRoute from './routes/doctorRoute.js';
import connectDB from './controllers/configDB.js';
connectDB();

const app = express();
const PORT = process.env.port || 7000;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', async (req, res)=>{
    res.render('home');
})

app.use('/user',userRoute);
app.use('/doctor',doctorRoute);


app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})