"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./route"));
dotenv_1.default.config({ path: 'Backend/.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const allowedOrigins = ['http://127.0.0.1:3000'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use('api/v1', route_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map