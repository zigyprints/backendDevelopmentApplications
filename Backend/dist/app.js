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
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection 
const monogoURL = `${process.env.MONGODB_URL}` || "mongodb://localhost:27017/todo-app";
function connection() {
    try {
        mongoose_1.default.connect(monogoURL);
        console.log("Connected To MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}
//Welcome Message
app.get("/", (req, res) => {
    res.status(201).json({ msg: "Welcome To Todo API" });
});
// Define Routes
app.use("/todo", todo_route_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection();
    console.log(`Server is running on port ${PORT}`);
}));
