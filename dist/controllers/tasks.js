"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const Task_1 = __importDefault(require("../models/Task"));
// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Public
exports.getTasks = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find();
    res.status(200).json({
        success: true,
        data: tasks,
    });
}));
// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Public
exports.getTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.findById(req.params.id);
    if (!task) {
        return next(new errorResponse_1.default(`Task not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: task,
    });
}));
// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Public
exports.createTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const task = yield Task_1.default.create({
        title,
        description,
    });
    res.status(201).json({
        success: true,
        data: task,
    });
}));
// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Public
exports.updateTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let task = yield Task_1.default.findById(req.params.id);
    if (!task) {
        return next(new errorResponse_1.default(`Task not found with id of ${req.params.id}`, 404));
    }
    task = yield Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: task,
    });
}));
// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Public
exports.deleteTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.findById(req.params.id);
    if (!task) {
        return next(new errorResponse_1.default(`Task not found with id of ${req.params.id}`, 404));
    }
    yield task.deleteOne();
    res.status(200).json({
        success: true,
        data: {},
    });
}));
