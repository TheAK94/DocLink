// import {getUser} from '../service/auth.js';
import jwt from "jsonwebtoken";
async function checkAuth(req, res, next){
    const token = req.cookies?.userToken;
    
    // console.log('token in cookie', token);
    
    if(!token){
        console.log('no token found');
        return res.redirect('/');
    }
    const payload = await jwt.verify(token, "secretKey");
    if(!payload){
        // console.log('wrong token');
        return res.redirect('/');
    }
    req.user = payload.user;
    next();
}
export default checkAuth;