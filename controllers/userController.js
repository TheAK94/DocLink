import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

async function handlerUserLogin(req, res) {
    const { email, password } = req.body;
    const userIsThere = await User.findOne({ email, password });
    if (!userIsThere) {
        return res.send("either email or password is wrong");
    }

    req.user = userIsThere;
    console.log("USER IS THERE", userIsThere);
    const payload = { user: userIsThere };
    const token = jwt.sign(payload, "secretKey");
    
    res.cookie("userToken", token, {
        httpOnly: true,
    });
    console.log("userToken", token);
    
    return res.redirect('/user/dashboard');
}



export { handlerUserLogin };
