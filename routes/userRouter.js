import express from 'express';
const app = express();
const router = express.Router();

import { handlerUserLogin, handlerUserSignup } from '../controllers/userController.js';


router.route('/login')
.get((req,res)=>{
    res.render('login');
}) 
.post(handlerUserLogin);

router.route('/signup')
.get((req,res)=>{
    res.render('signup');
}) 
.post(handlerUserSignup);


router.route('/dashboard')
.get( async (req,res)=>{
    res.render('dashboard');
});

router.route('/logout')
.get((req,res)=>{
    res.clearCookie('userToken');
    return res.redirect('/user/login');
});


export default router;