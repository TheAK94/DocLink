import User from '../models/userModel.js';
import jwt from "jsonwebtoken"
import { sendEmail } from '../services/sendMail.js';
import bcrypt from 'bcrypt';

async function handlerUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
        if (!user) return res.render('signin', { message: 'Invalid email' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.render('signin', { message: 'Invalid password' });

    const userIsThere = await User.findOne({ email });
    if (!userIsThere) {
        return res.status(401).send("either email or password is wrong");
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

async function handlerUserSignup(req, res) {
    const { firstName, lastName, email, password } = req.body;
    // const profileImageUser = req.file.filename;

    console.log(firstName, lastName, email, password);
    try {
        const checkExistingUser = await User.findOne({email: email});
        if(checkExistingUser){
            return res.status(401).send("User already exists, try new email");
        }
        const event = await User.create({

            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        console.log("created AN USER");

        res.cookie('flag', 1, { 
            maxAge: 2000, 
          });
        res.cookie('content', "Successfully Registered!",  { 
            maxAge: 2000, 
          });


        // mailing user 
        // sendEmail(
        //     `${email}, heyyynkit@gmail.com`,
        //     "You are Signed In",
        //     "Your are signed in bro!"
        //   );

        res.redirect('/');
    } catch (err) {
        console.log("ERROR CREATING AN USER", err);
    }
}

export { handlerUserLogin, handlerUserSignup };
