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
exports.createTask = void 0;
const schema_1 = __importDefault(require("../Database/schema"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, completed } = req.body;
    if (!title) {
        res.status(400).json({ error: 'There must be a title for the task ....' });
        return;
    }
    try {
        const newTask = yield schema_1.default.create({ title, completed });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating task.' });
    }
});
exports.createTask = createTask;
exports.default = exports.createTask;
//# sourceMappingURL=create.js.map