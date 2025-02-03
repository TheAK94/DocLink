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

router.get('/book-slot/:doctor/:index', checkAuth, async (req,res)=>{
    try{
        const {doctor, index} = req.params;
        console.log("Doctor ID:", doctor);
        console.log("Slot Index:", index);
        console.log("User ID:", req.user._id);
        
        const thatDoctor = await Doctor.findOne({_id: doctor});
        if(!thatDoctor){
            return res.status(404).send("Doctor not found");
        }
        const slot = thatDoctor.openSlots[index];
        if(!slot){
            return res.status(404).send("Slot not found");
        }
        if(!thatDoctor.openSlots){
            console.log("No open slots");
            return res.status(404).send("Slot not found");
        }

        
        // thatDoctor.bookedSlots.push([slot, req.user.id]);
        console.log("Slot booked, saved to doctor's booked slots");
        
        //adding to user's booked appointments
        const thisUser = await User.findOne({_id: req.user._id});
        if(!thisUser){
            return res.status(404).send("user not found");
        }

        await User.updateOne(
            { _id: req.user._id },
            { $push: { bookedAppointments: { slot: slot, doctor: thatDoctor.firstName, doctorId: thatDoctor._id } } }
          );
        console.log("User's appointment saved, redirecting...");

        //moving slot from open to booked
        thatDoctor.openSlots.splice(index, 1);
        await thatDoctor.save();


        //mailing the user

        
        

        res.redirect('/user/dashboard');
    }catch(error){
        console.log(error);
    }
});

router.route('/profile/:id')
.get(checkAuth, async (req,res)=>{
    try{
        const currentUser = await User.findOne({id : req.params._id});
        
        if (!currentUser) {
            return res.status(404).send("User not found");
        }

        res.render('userProfile', {user: currentUser});
    }catch(error){
        console.log(error); 
    }
});

export default router;