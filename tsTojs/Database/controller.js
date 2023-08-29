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
const schema_1 = __importDefault(require("./schema"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Title = req.body.title;
    if (!Title) {
        res.status(400).json({ error: 'There must be a title for the task ....' });
    }
    try {
        const newTask = yield schema_1.default.create({ Title });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating task.' });
    }
});
const getTask = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllTasks = yield schema_1.default.find();
        res.json(AllTasks);
    }
    catch (error) {
        res.status(500).json({ error: "Cannot fetch Tasks ..." });
    }
});
exports.default = { createTask, getTask };
//# sourceMappingURL=controller.js.map