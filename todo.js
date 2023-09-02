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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var sqlite3_1 = require("sqlite3");
// import and assign the body-parser middleware to the variable bodyParser
var bodyParser = require('body-parser');
var app = express_1();
app.use(bodyParser.json());
// we make a variable and assign it a value which is a port number
var HTTP_PORT = 8000;
// start the server
app.listen(HTTP_PORT, function () {
    console.log("Server is listening on port " + HTTP_PORT);
});
// The following lines initialize a sqllite db.
// Then checks if there is a todo table present or not, If not present then creates todo table with columns as id, title, completed.
//Finally it creates some dummy data.
var db = new sqlite3_1.Database('./todo.db', function (err) {
    if (err) {
        console.error("Erro opening database " + err.message);
    }
    else {
        db.run('CREATE TABLE todo( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            title NVARCHAR(20),\
            completed BOOLEAN NOT NULL DEFAULT 0\
        )', function (err) {
            if (err) {
                console.log("Table already exists.");
            }
            var insert = 'INSERT INTO todo (title, completed) VALUES (?,?)';
            db.run(insert, ["Ride Bus", 0]);
            db.run(insert, ["Go Picnic", 0]);
            db.run(insert, ["Buy Card", 0]);
        });
    }
});
// The following function implements the get request to retrieve a particular
// todo from the db through a unique id.
app.get("/todo/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        params = [req.params.id];
        db.get("SELECT * FROM todo where id = ?", [req.params.id], function (err, row) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json(row);
        });
        return [2 /*return*/];
    });
}); });
// The following function implements the get request to retrieve all 
// todo from the db 
app.get("/todo", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        db.all("SELECT * FROM todo", [], function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({ rows: rows });
        });
        return [2 /*return*/];
    });
}); });
// this following function implements the post request to create a new todo 
// and add it into exiting db
app.post("/todo/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody;
    return __generator(this, function (_a) {
        reqBody = req.body;
        console.log("check1", req);
        db.run("INSERT INTO todo ( title, completed) VALUES (?,?)", [reqBody.title, reqBody.completed], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(201).json({
                "id": this.lastID
            });
        });
        return [2 /*return*/];
    });
}); });
// the following function implements the pat request to update 
// the particular todo fron the already exiting db
app.patch("/todo/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody;
    return __generator(this, function (_a) {
        reqBody = req.body;
        db.run("UPDATE todo set title = ?, completed = ? WHERE id = ?", [reqBody.title, reqBody.completed, reqBody.id], function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message });
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
        return [2 /*return*/];
    });
}); });
// the following function mplements the delete request to delete 
// a particular todo from the db 
app["delete"]("/todo/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        db.run("DELETE FROM todo WHERE id = ?", req.params.id, function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message });
                return;
            }
            res.status(200).json({ deletedID: this.changes });
        });
        return [2 /*return*/];
    });
}); });
