import Doctor from '../models/doctorModel.js';
import jwt from "jsonwebtoken"
import multer from 'multer';

async function handlerDoctorLogin(req, res) {
    const { email, password } = req.body;
    const doctorIsThere = await Doctor.findOne({ email, password });
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
        // sendEmail(
        //     `${email}, heyyynkit@gmail.com`,
        //     "You are Signed In",
        //     "Your are signed in bro!"
        //   );
        res.redirect('/Doctor/login');
    } catch (err) {
        console.log("ERROR CREATING AN Doctor", err);
    }
}

export { handlerDoctorLogin, handlerDoctorSignup };
