"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/tasks', (_, res) => {
    res.send('Test route is working!');
});
exports.default = router;
//# sourceMappingURL=route.js.map