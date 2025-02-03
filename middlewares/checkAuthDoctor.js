// import {getUser} from '../service/auth.js';
import jwt from "jsonwebtoken";
async function checkAuthDoctor(req, res, next){
    const token = req.cookies?.doctorToken;
    
    // console.log('token in cookie', token);
    
    if(!token){
        console.log('no token found');
        return res.redirect('/doctor/login');
    }
    // const user = getUser(token);
    const payload = await jwt.verify(token, "doc_secretKey");
    if(!payload){
        // console.log('wrong token');
        return res.redirect('/doctor/login');
    }
    req.doctor = payload.doctor;
    next();
}
export default checkAuthDoctor;