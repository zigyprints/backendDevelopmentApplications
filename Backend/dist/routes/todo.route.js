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
const express_1 = __importDefault(require("express"));
const todo_model_1 = __importDefault(require("../models/todo.model"));
const todoRouter = express_1.default.Router();
// Create a Todo (POST)
todoRouter.post('/addTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new todo_model_1.default(req.body);
        const savedtodo = yield todo.save();
        res.status(201).json({ msg: "Todo created successfully" });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create todo' });
    }
}));
// Retrieve all todos (GET)
todoRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_model_1.default.find();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Retrieve a todo by ID (GET)
todoRouter.get('/getTodoById/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_model_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Update a todo by ID (PUT)
todoRouter.put('/editTodo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedtodo = yield todo_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedtodo) {
            return res.status(404).json({ error: 'todo not found' });
        }
        res.json({ msg: 'Todo updated successfully', Todo: updatedtodo });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Delete a todo by ID (DELETE)
todoRouter.delete('/deleteTodo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedtodo = yield todo_model_1.default.findByIdAndRemove(req.params.id);
        if (!deletedtodo) {
            return res.status(404).json({ error: 'todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = todoRouter;
