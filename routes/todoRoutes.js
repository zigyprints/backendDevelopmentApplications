"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/todoRoutes.ts
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
router.get('/tasks', todoController_1.getTasks);
router.post('/tasks', todoController_1.createTask);
router.put('/tasks/:id', todoController_1.updateTask);
router.delete('/tasks/:id', todoController_1.deleteTask);
exports.default = router;
