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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const db_1 = require("../database/db");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.initializeDatabase)();
    const tasks = yield db.all('SELECT * FROM tasks');
    yield db.close();
    res.json(tasks);
});
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = yield (0, db_1.initializeDatabase)();
    const task = yield db.get('SELECT * FROM tasks WHERE id = ?', id);
    yield db.close();
    if (task) {
        res.json(task);
    }
    else {
        res.status(404).json({ error: 'Task not found' });
    }
});
exports.getTaskById = getTaskById;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).json({ error: 'Title and description are required' });
        return;
    }
    const db = yield (0, db_1.initializeDatabase)();
    db.run('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)', [title, description, false], function (err) {
        if (err) {
            db.close();
            res.status(500).json({ error: 'Error creating task' });
            return;
        }
        const lastID = this.lastID;
        db.get('SELECT * FROM tasks WHERE id = ?', lastID, (err, newTask) => {
            db.close();
            if (err) {
                res.status(500).json({ error: 'Error fetching new task' });
            }
            else {
                res.status(201).json(newTask);
            }
        });
    });
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    if (!title || !description) {
        res.status(400).json({ error: 'Title and description are required' });
        return;
    }
    const db = yield (0, db_1.initializeDatabase)();
    yield db.run('UPDATE tasks SET title=?, description=?, completed=? WHERE id=?', [
        title,
        description,
        completed,
        id,
    ]);
    const updatedTask = yield db.get('SELECT * FROM tasks WHERE id = ?', id);
    yield db.close();
    if (updatedTask) {
        res.json(updatedTask);
    }
    else {
        res.status(404).json({ error: 'Task not found' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = yield (0, db_1.initializeDatabase)();
    yield db.run('DELETE FROM tasks WHERE id = ?', id);
    yield db.close();
    res.sendStatus(204);
});
exports.deleteTask = deleteTask;
