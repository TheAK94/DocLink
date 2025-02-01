import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import userRoute from './routes/userRouter.js';
import connectDB from './controllers/configDB.js';
connectDB();

const app = express();
const PORT = process.env.port || 7000;

// app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', async (req, res)=>{
    res.render('home');
})

app.use('/user',userRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})