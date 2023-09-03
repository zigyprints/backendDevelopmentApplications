"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const app = (0, express_1.default)();
const db = __importStar(require("./functions"));
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Create Tasks:
app.post("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.createTask(req.body);
        res.status(201).json({ id: result[0] });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}));
// Get Tasks:
app.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield db.getTasks();
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}));
// Update Tasks:
app.patch("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield db.updateTask(req.params.id, req.body);
    res.status(200).json({ id });
}));
// Delete task:
app.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.deleteTask(req.params.id);
    res.status(200).json({ success: true });
}));
app.listen(3000, () => {
    console.log("Server running on 3000");
});
