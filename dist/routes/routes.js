"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allControlls_1 = require("../controllers/allControlls");
const router = express_1.default.Router();
//route handler for creating the todo
router.post("/createtodo", allControlls_1.createTodo);
//route handler for updating the todo
router.put("/updatetodo", allControlls_1.updateTodo);
//route handler for getting all the todos
router.get("/gettodo", allControlls_1.getTodo);
//route handler for deleting the todos
router.delete("/deletetodo", allControlls_1.deleteTodo);
exports.default = router;
