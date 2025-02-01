import express from 'express';
const app = express();
const router = express.Router();


router.route('/login')
.get((req,res)=>{
    res.render('login');
}) 
.post(handlerUserLogin);