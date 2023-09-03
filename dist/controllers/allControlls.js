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
exports.deleteTodo = exports.getTodo = exports.updateTodo = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
//controller for creating todo
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todo, description } = req.body;
        const data = yield todoModel_1.default.create({
            title: todo,
            desc: description
        });
        if (data) {
            res.send({ success: true, message: "successfully created data in database", data: data });
        }
        else {
            res.send({ success: false, message: "Data has not been created in the databse" });
        }
    }
    catch (err) {
        res.send({ success: false, message: "Some error occured while creating the data in the database" });
    }
});
exports.createTodo = createTodo;
//controller for updating the todo
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, updatedTodo, updatedDesc } = req.body;
        const updatedData = yield todoModel_1.default.updateOne({ _id: id }, {
            $set: {
                title: updatedTodo,
                desc: updatedDesc
            }
        });
        if (updatedData) {
            const getUpdatedData = yield todoModel_1.default.findById({
                _id: id
            });
            res.send({ success: true, message: "successfully updated the data in database", data: getUpdatedData });
        }
        else {
            res.send({ success: false, message: "Data has not been updated the data in database" });
        }
    }
    catch (err) {
        res.send({ success: false, message: "Some error occured while updating the data in the database" });
    }
});
exports.updateTodo = updateTodo;
//controller for getting all todos
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getdata = yield todoModel_1.default.find();
        if (getdata) {
            res.send({ success: true, message: "successfully got data from the database", data: getdata });
        }
        else {
            res.send({ success: false, message: "There is no data you are looking for" });
        }
    }
    catch (err) {
        res.send({ success: false, message: "Some error occured while getting the data from the database" });
    }
});
exports.getTodo = getTodo;
//controller for deleting todo
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const deleteddata = yield todoModel_1.default.deleteOne({
            _id: id
        });
        if (deleteddata) {
            res.send({ success: true, message: "successfully deleted  data in theb database", data: deleteddata });
        }
        else {
            res.send({ success: false, message: "thereis no data that you wants to delete" });
        }
    }
    catch (err) {
        res.send({ success: false, message: "Some error occured while deleting the data from the database" });
    }
});
exports.deleteTodo = deleteTodo;
