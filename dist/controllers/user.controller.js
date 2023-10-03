var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
export function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.body;
            const user = new User(userData);
            yield user.save();
            return res.status(201).json({ token: user.id });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
//# sourceMappingURL=user.controller.js.map