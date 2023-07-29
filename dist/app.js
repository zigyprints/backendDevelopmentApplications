"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const todoController_1 = __importDefault(require("./controllers/todoController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/api/todos', todoController_1.default.getAllTodos);
app.post('/api/todos', todoController_1.default.createTodo);
app.put('/api/todos/:id', todoController_1.default.updateTodo);
app.delete('/api/todos/:id', todoController_1.default.deleteTodo);
//Sync db
database_1.default.sync({ alter: true })
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on PORT:${port}`);
    });
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
