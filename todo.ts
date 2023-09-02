
import express, { Request, Response } from 'express';
import sqlite3  from 'sqlite3';

// import and assign the body-parser middleware to the variable bodyParser
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json())

// we make a variable and assign it a value which is a port number
const HTTP_PORT = 8000

// start the server
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});


// The following lines initialize a sqllite db.
// Then checks if there is a todo table present or not, If not present then creates todo table with columns as id, title, completed.
//Finally it creates some dummy data.
const db = new sqlite3.Database('./todo.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE todo( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            title NVARCHAR(20),\
            completed BOOLEAN NOT NULL DEFAULT 0\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO todo (title, completed) VALUES (?,?)';
            db.run(insert, ["Ride Bus", 0]);
            db.run(insert, ["Go Picnic", 0]);
            db.run(insert, ["Buy Card", 0]);
        });
    }
});


// The following function implements the get request to retrieve a particular
// todo from the db through a unique id.
app.get("/todo/:id",  async (req: Request, res: Response)  => {
    var params = [req.params.id]
    db.get("SELECT * FROM todo where id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

// The following function implements the get request to retrieve all 
// todo from the db 
app.get("/todo",  async (req: Request, res: Response) => {
    db.all("SELECT * FROM todo", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});

// this following function implements the post request to create a new todo 
// and add it into exiting db
app.post("/todo/", async (req: Request, res: Response) => {
    var reqBody = req.body;
    console.log("check1", req)
    db.run("INSERT INTO todo ( title, completed) VALUES (?,?)",
        [reqBody.title, reqBody.completed],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "id": this.lastID
            })
        });
});

// the following function implements the pat request to update 
// the particular todo fron the already exiting db
app.patch("/todo/",  async (req: Request, res: Response) => {
    var reqBody = req.body;
    db.run(`UPDATE todo set title = ?, completed = ? WHERE id = ?`,
        [reqBody.title, reqBody.completed, reqBody.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

// the following function mplements the delete request to delete 
// a particular todo from the db 
app.delete("/todo/:id",  async (req: Request, res: Response)  => {
    db.run(`DELETE FROM todo WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});