import Doctor from '../models/doctorModel.js';
import jwt from "jsonwebtoken"
import multer from 'multer';
import { sendEmail } from '../services/sendMail.js';
import bcrypt from 'bcrypt';

async function handlerDoctorLogin(req, res) {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email: email });
        if (!doctor) return res.render('/doctor/login', { message: 'Invalid email' });

    const isValid = await bcrypt.compare(password, doctor.password);
    if (!isValid) return res.render('/doctor/login', { message: 'Invalid password' });


    const doctorIsThere = await Doctor.findOne({ email});
    if (!doctorIsThere) {
        return res.send("either email or password is wrong");
    }

    req.doctor = doctorIsThere;
    console.log("doctor IS THERE", doctorIsThere);
    const payload = { doctor: doctorIsThere };
    const token = jwt.sign(payload, "doc_secretKey");
    
    // Set cookie with options
    res.cookie("doctorToken", token, {
        httpOnly: true,
    });
    console.log("doctorToken", token);
    
    return res.redirect('/doctor/dashboard');
}

async function handlerDoctorSignup(req, res) {
    const { firstName, lastName, speciality, experience, email, password } = req.body;
    const profileImage = req.file.filename; 

    // console.log(req.body);
    // console.log(req.file);
    // console.log(profileImage);

    
    try {
        const checkExistingDoctor = await Doctor.findOne({ email });
        if(checkExistingDoctor){
            return res.status(401).send("Doctor already exists, try new email");
        }
        const event = await Doctor.create({
            firstName: firstName,
            lastName: lastName,
            speciality: speciality,
            experience: experience,
            email: email,
            profileImage: profileImage, // Save the image path in the doctor model
            password: password,

        });
        console.log("created AN Doctor");
        res.cookie('flag', 1, { 
            maxAge: 2000, 
          });
        res.cookie('content', "Successfully Registered a doctor!",  { 
            maxAge: 2000, 
          });
        
        //   mailing doctor 
        sendEmail(
            `${email}, heyyynkit@gmail.com`,
            "You are Signed In",
            `You have successfully registered your account on ${new Date().toLocaleString()}.`
          );
        res.redirect('/Doctor/login');
    } catch (err) {
        console.log("ERROR CREATING AN Doctor", err);
    }
}

export { handlerDoctorLogin, handlerDoctorSignup };
