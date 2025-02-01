import express from 'express';
const app = express();
const router = express.Router();

import { handlerUserLogin, handlerUserSignup } from '../controllers/userController.js';
import checkAuth from '../middlewares/checkAuth.js';
import User from '../models/userModel.js';

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
.get(checkAuth, async (req,res)=>{
    res.render('userDashboard', {user: req.user});
});

router.route('/logout')
.get(checkAuth, (req,res)=>{
    res.clearCookie('userToken');
    return res.redirect('/user/login');
});


export default router;