import express from 'express';
const router = express.Router();
import { handlerDoctorLogin, handlerDoctorSignup } from '../controllers/doctorController.js';
import checkAuthDoctor from '../middlewares/checkAuthDoctor.js';
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


//profile routee
router.route('/profile/:id')
.get(checkAuthDoctor, async (req,res)=>{
    try{
    const currentDoctor = await Doctor.findOne({id : req.params._id});
    
    if (!currentDoctor) {
        return res.status(404).send("User not found");
    }

    res.render('doctorProfile', {doctor: currentDoctor});
    }catch(error){
        console.log(error); 
    }
})



//dashboard
router.route('/dashboard')
.get(checkAuthDoctor, async (req,res)=>{
    const doctor = await Doctor.findOne({id:req.doctor.id});
    res.render('../views/doctor/doctorDashboard', {doctor: doctor});
})
.post(checkAuthDoctor, async (req,res)=>{
    try{
        const {timeSlot} = req.body;
        if(!timeSlot){
            console.log("Please provide a valid time slot");
            return res.status(400).send("Please provide a valid time slot");
        }
        console.log(req.doctor);

        const currentDoctor = await Doctor.findOne({id : req.doctor.id});
        if(!currentDoctor){
            console.log("You are not logged in");
            return res.status(400).send("You are not logged in");
        }
        if(currentDoctor.openSlots.includes(timeSlot)){
            return res.status(400).send("You already have a filled slot at this time");
        }
        currentDoctor.openSlots.push(timeSlot);
        await currentDoctor.save();
        console.log("current doc",currentDoctor);
        
        console.log("Time slot added successfully");
        // return res.redirect('/doctor/dashboard');
        res.render('doctordashboard', { doctor: currentDoctor });
    }
    catch(error){
        console.log(error);
        return res.status(500).send("An error occurred while processing your request");
    }
});



//logout
router.route('/logout')
.get((req,res)=>{
    res.clearCookie('doctorToken');
    return res.redirect('/');
});
export default router;