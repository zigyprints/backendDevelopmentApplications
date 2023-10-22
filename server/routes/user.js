import express from 'express'
import crypt from 'crypto'
import {
    getUser,
    updateUserDetails,
    getUserById,
    getUserMessages,
    getAllUsers
} from '../controllers/user.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

const get_hash = (text) => {
    const hash = crypt.createHash('sha512')
    hash.update(text)
    return hash.digest('hex')
}



router.get('/all', getAllUsers) // getting all users information 
router.get('/profile', verifyToken, getUser) // getting user information 
router.post('/update', verifyToken, updateUserDetails) // updating user details 
router.post('/getMessages', verifyToken, getUserMessages) // for getting all the message of an user with another user 
router.get('/:id', getUserById) // getting a specific user by its user id 


export default router