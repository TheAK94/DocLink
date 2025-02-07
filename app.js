import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';

import run from './services/healthBot.js'
import run2 from './services/symptomBot.js'
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
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', async (req, res)=>{
    var flag = req.cookies?.flag || 100;
      var content = req.cookies?.content || "Done!";
      res.clearCookie('flag');
      res.clearCookie('content');
    res.render('home', {flag, content});
})

app.post('/api/run', async (req, res) => {
    const { input } = req.body; 

    try {
        const result = await run(input);
        res.json({ output: result }); 
    } catch (error) {
        console.error('Error running the health bot:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/run2', async (req, res) => {
    const { input } = req.body; 

    try {
        const result = await run2(input);
        res.json({ output: result }); 
    } catch (error) {
        console.error('Error running the health bot:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/speciality', async (req, res) => {
    res.render('specialities_page');
});
app.get('/symptomBot', async (req, res) => {
    res.render('symptomBot');
});
app.use('/user',userRoute);
app.use('/doctor',doctorRoute);


app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})