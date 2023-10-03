import { Request, Response, NextFunction } from "express";
import { getUsers } from "../utils";
import { User } from "../utils";

const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username) {
        res.status(400).json({"error": "Username not provided!"});
        return;
    }
    if (!password) {
        res.status(400).json({"error": "Password not provided!"});
        return;
    }

    // Check if user in db
    const users = getUsers();
    const user: User = users.find((u: User) => u.username == username);
    
    if (!user) {
        res.status(404).json({"error": "User does not exist!"});
        return;
    }

    req.body.db_user = user;
    next();
}

export default verifyUser;