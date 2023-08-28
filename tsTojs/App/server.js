"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const connection_1 = __importDefault(require("../Database/connection"));
(0, connection_1.default)();
const server = index_1.default.listen(3000, () => {
    console.log("Server is connected on port 3000 .....");
});
//# sourceMappingURL=server.js.map