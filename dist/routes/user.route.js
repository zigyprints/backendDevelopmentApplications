import { Router } from "express";
import { authenticateUser } from "../controllers/user.controller.js";
const router = Router();
router.post("/auth", authenticateUser);
export default router;
//# sourceMappingURL=user.route.js.map