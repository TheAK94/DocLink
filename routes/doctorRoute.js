import express from 'express';
const router = express.Router();
import { handlerDoctorLogin, handlerDoctorSignup } from '../controllers/doctorController.js';
import Doctor from '../models/doctorModel.js';

router.route('/login')
.get((req,res)=>{
    res.render('../views/doctor/doctorLogin');
}) 
.post(handlerDoctorLogin);


router.route('/signup')
.get((req,res)=>{
    res.render('../views/doctor/doctorSignup');
}) 
.post(handlerDoctorSignup);

export default router;