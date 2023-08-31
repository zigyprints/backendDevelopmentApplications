"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
console.log(process.env.DB_URl);
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const dbUrl = process.env.DB_URL || "";
mongoose_1.default
    .connect(dbUrl)
    .then(() => {
    console.log("DATABASE CONNECTED");
})
    .catch((e) => {
    console.log(e);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Welcome to the ToDo API");
});
// app.use("/todos", ToDosRoutes);
const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
//# sourceMappingURL=app.js.map