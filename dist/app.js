"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = __importDefault(require("./middleware/error"));
const tasks_1 = __importDefault(require("./routes/tasks"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose_1.default.connection.on("connected", () => {
    console.log(`MongoDB Connected`.cyan.underline.bold);
});
app.use(express_1.default.json());
app.use(error_1.default);
app.use("/api/v1/tasks", tasks_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the TodoList API");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const message = `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`;
    console.log(colors_1.default.yellow.bold(message));
});
