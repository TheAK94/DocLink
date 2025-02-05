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

    res.render('doctor/doctorProfile', {doctor: currentDoctor});
    }catch(error){
        console.log(error); 
    }
})

//dashboard
router.route('/dashboard')
.get(checkAuthDoctor, async (req,res)=>{
    const doctor = await Doctor.findOne({_id:req.doctor._id});
    res.render('../views/doctor/doctorDashboard', {doctor: doctor});
})
.post(checkAuthDoctor, async (req,res)=>{
    try{
        const {date, timeSlot} = req.body;
        if(!timeSlot){
            console.log("Please provide a valid time slot");
            return res.status(400).send("Please provide a valid time slot");
        }
        // console.log(req.doctor);

        const currentDoctor = await Doctor.findOne({_id : req.doctor._id});
        if(!currentDoctor){
            console.log("You are not logged in");
            return res.status(400).send("You are not logged in");
        }
        // if(currentDoctor.openSlots.includes(timeSlot)){
        //     return res.status(400).send("You already have a filled slot at this time");
        // }
        if (currentDoctor.openSlots.some(slot => slot.date === date && slot.time === timeSlot)) {
            return res.status(400).send("You already have a filled slot at this time");
        }

        currentDoctor.openSlots.push({date: date, time: timeSlot});
        await currentDoctor.save();
        // console.log("current doc",currentDoctor);
        
        console.log("Time slot added successfully");
        // return res.redirect('/doctor/dashboard');
        res.render('../views/doctor/doctorDashboard', { doctor: currentDoctor });
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

router.post('/remove-slot/:index', checkAuthDoctor, async (req,res)=>{
    try{
        const {index} = req.params;
        const currentDoctor = await Doctor.findOne({id:req.doctor.id});
        if(!currentDoctor){
            console.log("You are not logged in");
            return res.status(400).send("You are not logged in");
        }
        currentDoctor.openSlots.splice(index, 1);
        await currentDoctor.save();
        console.log("Time slot removed successfully");
        return res.redirect('/doctor/dashboard');
    }
    catch(error){
        console.log(error);
        return res.status(500).send("An error occurred while processing your request");
    }
});

export default router;