import express,{ Express,Request,Response, Router } from 'express';
import {chatUser,findUserChats,findChat} from '../controllers/chatControl.js'

const router:Router = express.Router();

router.post('/',chatUser)
router.get('/:userId',findUserChats)
router.get('/find/:firstId/:secondId',findChat)

export default router;