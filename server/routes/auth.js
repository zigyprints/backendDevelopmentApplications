import express from 'express'
import { login , register , logout} from '../controllers/auth.js'
import { verifyToken } from '../middlewares/auth.js'
import User from '../models/user.js'
const router = express.Router()


router.post('/login', login)


router.post('/register', register)


router.get('/logout' , verifyToken , logout) 



export default router