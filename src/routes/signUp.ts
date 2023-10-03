import * as express from 'express'; 
import { Router, Request, Response } from 'express';
import { config } from "dotenv";
import { hashPassword, writeUsers, User, getUsers } from "../utils";

config();
const router: Router = express.Router();

router.post("/", (req: Request, res: Response): void => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;

        if (!username) {
            res.status(400).json({"error": "Username Not Provided"});
            return
        }
        if (!password) {
            res.status(400).json({"error": "Password Not Provided"});
            return
        }

        // Check if user in db
        const users = getUsers();
        const user: User = users.find((u: User) => u.username == username);
        
        if (user) {
            res.status(404).json({"error": "User already exists"});
            return;
        }

        hashPassword(password)
            .then((hashedPass: string) => {
                const newUser: User = {
                    "username": username,
                    "password": hashedPass
                };

                writeUsers(newUser);
                res.redirect("/login");
            })
    } catch (err) {
        res.status(500).json({"error": err})
    }
});

export default router;