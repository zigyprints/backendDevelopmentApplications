var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import User from "src/models/User.js";
const router = Router();
router.post("auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const user = new User(userData);
        user.save();
        res.cookie("token", user.id, {
            httpOnly: true,
        });
        return res.status(201).json({ message: "User authenticated" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
export default router;
//# sourceMappingURL=auth.route.js.map