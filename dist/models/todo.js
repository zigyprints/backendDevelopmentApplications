"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    task: {
        type: String,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});
exports.ToDo = mongoose_1.default.model("todo", todoSchema);
//# sourceMappingURL=todo.js.map