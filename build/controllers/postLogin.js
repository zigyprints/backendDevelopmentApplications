var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User.findOne({ username: req.body.username });
    if (foundUser) {
        const correctPass = bcrypt.compareSync(req.body.password, foundUser.password);
        if (correctPass) {
            const token = jwt.sign({ uid: foundUser._id }, process.env.JWT_KEY);
            res.cookie('login', token).cookie('username', foundUser.username).status(200).send({ message: `User with username:${foundUser.username} is logged in.` });
        }
        else {
            res.status(400).send({ message: 'User credentials invalid' });
        }
    }
    else {
        res.status(400).send({ message: 'User does not exists' });
    }
});
export default postLogin;
