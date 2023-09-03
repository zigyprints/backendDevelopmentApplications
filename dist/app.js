"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config/config"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
//configuring our node environment variables
dotenv_1.default.config({ path: './src/config.env' });
//calling connectDB function to connect database
(0, config_1.default)();
//middleware for handling incomming json data
app.use(express_1.default.json());
//middleware for handling  all routes
app.use('/todoapi', routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} at server started`);
});
