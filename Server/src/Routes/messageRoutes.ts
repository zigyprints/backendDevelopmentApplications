import express,{ Express,Request,Response, Router } from 'express';
import {createMessage,getMessages} from '../controllers/messageControls.js';

const router:Router = express.Router();

router.post('/',createMessage)
router.get('/:chatId',getMessages)

export default router;