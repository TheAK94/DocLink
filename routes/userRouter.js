import express from 'express';
const app = express();
const router = express.Router();

import { handlerUserLogin } from '../controllers/userController.js';


router.route('/login')
.get((req,res)=>{
    res.render('login');
}) 
.post(handlerUserLogin);

export default router;