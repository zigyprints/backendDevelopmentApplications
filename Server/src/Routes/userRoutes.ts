import express,{ Express,Request,Response } from 'express';
import {registerUser} from '../controllers/userControls.js'

const router = express.Router();

router.post('/register',registerUser)

export default router;