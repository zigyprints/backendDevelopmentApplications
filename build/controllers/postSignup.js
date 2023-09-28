var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
const postSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User.findOne({ username: req.body.username });
    if (!existingUser) {
        const hash = yield bcrypt.hashSync(req.body.password, 10);
        const user = User.create({
            username: req.body.username,
            password: hash
        }).then(response => res.status(200).send({ message: `User with username:${response.username} has been created` }));
    }
    else {
        res.status(400).send({ message: 'User already exists' });
    }
});
export default postSignup;
