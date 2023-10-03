import * as express from 'express'; 
import { Router, Request, Response } from 'express';
import { authPassword, User } from '../utils';
import verifyUser from '../middlewares/verifyUser';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';

config();
const JWT_KEY: string = process.env.JWT_PRIVATE_KEY;
const router: Router = express.Router();

router.post("/", verifyUser, (req: Request, res: Response): void => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password
    }

    // Check Pass
    const db_user: User = req.body.db_user;
    authPassword(user.password, db_user.password)
      .then((isSame: boolean) => {
        if (!isSame) {
          res.status(401).json({"error": "Password is incorrect!"});
          return
        }
        // Create JWT token and assign to cookies
        const token = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
        res.cookie('chat_token', `Bearer ${token}`);
        setTimeout(() => {
        }, 100);

        res.redirect("/room");
      })
      .catch((err: Error) => {throw err});

  } catch (err) {
    res.status(500).json({"error": err});
  }
})

export default router;
