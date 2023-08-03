"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasksControllers_1 = require("../controllers/tasksControllers");
const router = express_1.default.Router();
router.get('/tasks', tasksControllers_1.getAllTasks);
router.get('/tasks/:id', tasksControllers_1.getTaskById);
router.post('/tasks', tasksControllers_1.createTask);
router.put('/tasks/:id', tasksControllers_1.updateTask);
router.delete('/tasks/:id', tasksControllers_1.deleteTask);
exports.default = router;
