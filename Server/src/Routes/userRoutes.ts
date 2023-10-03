import express,{ Express,Request,Response, Router } from 'express';
import {registerUser,loginUser,finduser,getalluser} from '../controllers/userControls.js'

const router:Router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/find/:userId',finduser)
router.get('/',getalluser)

export default router;