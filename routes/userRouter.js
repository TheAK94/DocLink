import express from 'express';
const app = express();
const router = express.Router();

import { handlerUserLogin, handlerUserSignup } from '../controllers/userController.js';
import checkAuth from '../middlewares/checkAuth.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';

router.route('/login')
.post(handlerUserLogin);

router.route('/signup')
.post(handlerUserSignup);


router.route('/dashboard')
.get(checkAuth, async (req,res)=>{
    const allDoctors = await Doctor.find({});
    const myuser = await User.findOne({_id : req.user._id});
    res.render('userDashboard', {user: myuser, allDoctors: allDoctors});
});

router.route('/logout')
.get(checkAuth, (req,res)=>{
    res.clearCookie('userToken');
    return res.redirect('/');
});


export default router;