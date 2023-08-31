import express,{Request,Response} from 'express';
import { userValidator, signInValidator } from '../middlewares/user';
import { signIn, create } from '../controllers/user';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();


router.post("/create",userValidator,validateRequest,create);
router.post("/signin", signInValidator,validateRequest,signIn);


export default router;