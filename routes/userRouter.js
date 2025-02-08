import express from 'express';
const app = express();
const router = express.Router();
import { sendEmail } from '../services/sendMail.js';

import { handlerUserLogin, handlerUserSignup } from '../controllers/userController.js';
import checkAuth from '../middlewares/checkAuth.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
// import  upload from '../middlewares/multer.js'
router.route('/login')
.post(handlerUserLogin);

router.route('/signup')
.post(handlerUserSignup); 


router.route('/dashboard')
.get(checkAuth, async (req,res)=>{
    const allDoctors = await Doctor.find({});
    const myuser = await User.findOne({_id : req.user._id});

    var flag = req.cookies?.flag || 100;
    var content = req.cookies?.content || "Done!";
    res.clearCookie('flag');
    res.clearCookie('content');

    res.render('userDashboard', {user: myuser, allDoctors: allDoctors, flag, content});
});

router.route('/logout')
.get(checkAuth, (req,res)=>{
    res.clearCookie('userToken');
    return res.redirect('/');
});

router.get('/bookAppointments', checkAuth, async (req, res) => {
    const allDoctors = await Doctor.find({});

    var flag = req.cookies?.flag || 100;
    var content = req.cookies?.content || "Done!";
    res.clearCookie('flag');
    res.clearCookie('content');
    res.render('bookAppointments', {allDoctors: allDoctors,flag, content});
})

// using as an API 
// router.get('/available-slots/:doctorId/:date', async (req, res) => {
//     try {
//         const { doctorId, date } = req.params;
//         const thatDoctor = await Doctor.find({
//             _id: doctorId,
//         });
//         const slots = thatDoctor[0].openSlots.filter((slot) => slot.date === date);
//         res.json(slots);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


router.get('/book-slot/:doctor/:date/:time', checkAuth, async (req,res)=>{
    try{
        const {doctor, date, time} = req.params;
        console.log("Doctor ID:", doctor);
        console.log("Slot date:", date);
        console.log("Slot time:", time);
        console.log("User ID:", req.user._id);
        
        const thatDoctor = await Doctor.findOne({_id: doctor});
        if(!thatDoctor){
            return res.status(404).send("Doctor not found");
        }
        const slot = thatDoctor.openSlots.find((slot) => slot.date === date && slot.time === time);
        if(!slot){
            return res.status(404).send("Slot not found");
        }
        if(!thatDoctor.openSlots){
            console.log("No open slots");
            return res.status(404).send("Slot not found");
        }

        //adding to user's booked appointments
        const thisUser = await User.findOne({_id: req.user._id});
        if(!thisUser){
            return res.status(404).send("user not found");
        }
        await User.updateOne(
            { _id: req.user._id },
            { $push: { bookedAppointments: { date: date, time: time, doctor: thatDoctor.firstName, doctorId: thatDoctor._id } } }
          );
        console.log("User's appointment saved, redirecting...");

        //moving slot from open to booked
        thatDoctor.bookedSlots.push({date: date, time: time, user: req.user.firstName, userId: req.user._id});
        thatDoctor.openSlots = thatDoctor.openSlots.filter(slot => !(slot.date === date && slot.time === time));
        await thatDoctor.save();
        console.log("Slot booked, saved to doctor's booked slots");

        // mailing the user
        sendEmail(
            `${thisUser.email}, heyyynkit@gmail.com`,
            "Your Appointment is Confirmed",
            `Booked your appointment on "${date}" at "${time}" with "${thatDoctor.firstName}". Please be a good patient and try to be on time.`
          );

        //setting push message
        res.cookie('flag', 1, { 
            maxAge: 2000, 
          });
        res.cookie('content', `Booked your appointment on "${date}" at "${time}" with "${thatDoctor.firstName}"`,  { 
            maxAge: 2000, 
          });

        res.redirect('/user/dashboard');
    }catch(error){
        console.log(error);
    }
});



router.get('/cancel-appointment/:doctorId/:date/:time', checkAuth, async (req,res)=>{
    try {
        const {doctorId, date, time} = req.params;
        const thatDoctor = await Doctor.findOne({_id: doctorId});
        const thatUser = await User.findOne({_id : req.user._id});

        console.log("before deleting", thatUser.bookedAppointments);

        thatDoctor.bookedSlots = thatDoctor.bookedSlots.filter((slot)=>{return !(slot.date === date && slot.time === time)});
        thatDoctor.openSlots.push({date: date, time: time});
        console.log("after deleting", thatUser.bookedAppointments);
        
        thatUser.bookedAppointments = thatUser.bookedAppointments.filter((appointment)=> !(appointment.date === date && appointment.time === time && appointment.doctorId === doctorId));
        await thatDoctor.save();
        await thatUser.save();
        console.log('deleted successfully');
        res.redirect('/user/dashboard')

    } catch (error) {
        console.log(error);
        
    }
})



// profile route
router.route('/profile/:id')
.get(async (req,res)=>{
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

router.get('/bookAppointments/search', checkAuth, 
    async (req, res)=>{
      try{
        const user = req.user;
        var flag = req.cookies?.flag || 100;
        var content = req.cookies?.content || "Done!";
        res.clearCookie('flag');
        res.clearCookie('content');
  
        const searchTerm = req.query.searchTerm || "";
        const allDoctors = await Doctor.find({$or : [{firstName: new RegExp (searchTerm, "i")}, {lastName: new RegExp (searchTerm, "i")}]});

        var flag = req.cookies?.flag || 100;
        var content = req.cookies?.content || "Done!";
        res.clearCookie('flag');
        res.clearCookie('content');
        res.render('bookAppointments', {allDoctors: allDoctors,flag, content});
      }catch(error){
        console.log(`error in searching the note`,error);
      }
    }
);
// router.get('/bookAppointments/filter', checkAuth, 
//     async (req, res)=>{
//       try{
//         const user = req.user;
//         var flag = req.cookies?.flag || 100;
//         var content = req.cookies?.content || "Done!";
//         res.clearCookie('flag');
//         res.clearCookie('content');
  
//         const searchTerm = req.query.speciality || "";
//         console.log(searchTerm);
//         const allDoctors = await Doctor.find({$or : [{speciality: new RegExp (searchTerm, "i")}]});

//         var flag = req.cookies?.flag || 100;
//         var content = req.cookies?.content || "Done!";
//         res.clearCookie('flag');
//         res.clearCookie('content');
//         res.render('bookAppointments', {allDoctors: allDoctors,flag, content});
//       }catch(error){
//         console.log(`error in searching the note`,error);
//       }
//     }
// );
router.get('/bookAppointments/filter', async (req, res) => {
    try {
        const user = req.user;
        const flag = req.cookies?.flag || 100;
        const content = req.cookies?.content || "Done!";
        res.clearCookie('flag');
        res.clearCookie('content');

        // Get filters from query parameters
        const searchTerm = req.query.speciality || "";
        const experienceRange = req.query.experience || "";

        // Prepare MongoDB query object
        let query = {};

        // Add speciality filter if selected
        if (searchTerm) {
            query.speciality = new RegExp(searchTerm, "i");
        }

        // Add experience filter if selected
        if (experienceRange) {
            const [minExp, maxExp] = experienceRange.split('-');
            if (maxExp) {
                query.experience = { $gte: parseInt(minExp), $lte: parseInt(maxExp) };
            } else if (experienceRange === "16+") {
                query.experience = { $gte: 16 };
            }
        }

        console.log("Search Query:", query);

        const allDoctors = await Doctor.find(query);
        res.render('bookAppointments', { allDoctors: allDoctors, flag, content });
    } catch (error) {
        console.log(`Error in searching doctors:`, error);
    }
});

export default router;
