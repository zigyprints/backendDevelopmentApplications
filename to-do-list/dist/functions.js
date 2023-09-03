"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.getTasks = exports.createTask = void 0;
const knex_1 = __importDefault(require("./db/knex"));
const createTask = (task) => {
    return (0, knex_1.default)("tasks").insert(task);
};
exports.createTask = createTask;
const getTasks = () => {
    return (0, knex_1.default)("tasks").select("*");
};
exports.getTasks = getTasks;
const deleteTask = (id) => {
    return (0, knex_1.default)("tasks").where("id", id).del();
};
exports.deleteTask = deleteTask;
const updateTask = (id, task) => {
    return (0, knex_1.default)("tasks").where("id", id).update(task);
};
exports.updateTask = updateTask;
