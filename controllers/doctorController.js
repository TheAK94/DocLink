import Doctor from '../models/doctorModel.js';
import jwt from "jsonwebtoken"

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
    const { firstName, lastName, speciality, email, password } = req.body;
   
    try {
        const checkExistingDoctor = await Doctor.findOne({ email });
        if(checkExistingDoctor){
            return res.status(401).send("Doctor already exists, try new email");
        }
        const event = await Doctor.create({
            firstName: firstName,
            lastName: lastName,
            speciality: speciality,
            email: email,
            password: password
        });
        console.log("created AN Doctor");
        res.redirect('/Doctor/login');
    } catch (err) {
        console.log("ERROR CREATING AN Doctor", err);
    }
}

export { handlerDoctorLogin, handlerDoctorSignup };
