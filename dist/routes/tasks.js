"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
## the following code performs querying from the database
## also the nodejs api is constructed to connect with the database and fetch the data
## these codes can create,update,read and delete the items of todo.
*/
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../db/database"));
const router = express_1.default.Router();
router.get('/tasks', (req, res) => {
    database_1.default.all("SELECT * FROM newtodo", (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Failed to retrieve from the database" }); // status code of 500 is given for internal error
        }
        res.json(rows); // when successful the api will return all the list.
    });
});
router.post('/tasks/add', (req, res) => {
    const { task, desc } = req.body;
    if (!task || !desc) { // Both the title and description of the task is required.
        return res.status(400).json({ error: "Title and Description are missing!" });
    }
    const newTodo = {
        id: Math.random().toString(10).substring(2),
        task,
        desc,
        completed: false
    };
    database_1.default.run("INSERT INTO newtodo (id,task,desc,completed) VALUES(?,?,?,?)", //sqlite query to insert new item value into the table.
    [newTodo.id, newTodo.task, newTodo.desc, newTodo.completed ? 1 : 0], (error) => {
        if (error) {
            return res.status(500).json({ error: "Failed to create the task. Try again..." });
        }
        res.status(201).json(newTodo);
    });
});
router.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { task, desc, completed } = req.body;
    database_1.default.run("UPDATE newtodo SET task = ?, desc = ?, completed = ? WHERE id = ?", [task, desc, completed ? 1 : 0, id], //sqlite query to update the task by getting the item through id.
    (error) => {
        if (error) {
            return res.status(500).json({ error: "Unable to update the task item!!" });
        }
        res.status(200).json({ success: "Successfuly updated." });
    });
});
router.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    database_1.default.run("DELETE FROM newtodo WHERE id = ?", [id], (error) => {
        if (error) {
            return res.status(500).json({ error: "The task item does not exist." });
        }
        res.status(200).json("The item is deleted.");
    });
});
module.exports = router;
