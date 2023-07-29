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
const todo_1 = __importDefault(require("../models/todo"));
class TodoController {
    getAllTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield todo_1.default.findAll();
                res.json(todos);
            }
            catch (error) {
                res.status(500).json({ error: `Internal server error` });
            }
        });
    }
    createTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = req.body; //bcause of body-parser we can parse the req
            if (!text) { // We're only checking for text cause its allowNull:false
                res.status(400).json({ error: 'Cannot have empty text as todo!' });
                return;
            }
            try {
                //Performing any db action always returns promise so we await
                const newTodo = yield todo_1.default.create({ text });
                res.json(newTodo);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    updateTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //req.params cause id would be in req search
            const { text, done, duedate } = req.body; // req.body cause fields will be json in form
            try {
                const todo = yield todo_1.default.findByPk(id);
                if (!todo) {
                    res.status(404).json({ error: 'Todo not found' });
                    return;
                }
                //if the given fields were empty/nothing updated
                todo.text = text || todo.text;
                todo.done = done || todo.done;
                todo.duedate = duedate || todo.duedate;
                yield todo.save();
                res.json(todo);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    deleteTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const todo = yield todo_1.default.findByPk(id);
                if (!todo) {
                    res.status(404).json({ error: 'Todo not found' });
                    return;
                }
                yield todo.destroy();
                res.status(204);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new TodoController();
