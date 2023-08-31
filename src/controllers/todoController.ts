import {Request, Response, NextFunction} from 'express';
import mongoose  from 'mongoose';
import { ITodo } from '../interfaces';
import ToDoModel from '../models/todoModel';

// Retrieve all To-Dos from the database
const getTodos = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const todoList = await ToDoModel.find().select("name description createdAt isCompleted");
        
        return res.status(200).json(todoList);
        
    }
    catch(e) {
        if(e instanceof Error) {
            console.log(e.message);
        }
        return res.status(500).json({
            success: false,
            message: "Server Error!"
        })
    }
}   

// Retrieve a single To-Do from the database by passing its ID
const getTodoById = async(req : Request, res: Response, next: NextFunction) => {

    const {id} = req.params;
    try {
        const todoDocument = await ToDoModel.findById(id).select("name description createdAt isCompleted");;
        if(todoDocument){
            return res.status(200).json(todoDocument);
        }
        else {
            return res.status(404).json({
                success: false,
                message: "No such To-Do exists!"
            })
        }
    }
    catch(e) {
        if(e instanceof Error){
            console.log(e.message);
        }
        if(e instanceof mongoose.Error && e.name === "CastError") {
            return res.status(404).json({
                success: false,
                message: "No such To-Do exists!"
            })
        }
        return res.status(500).json({
            success: false,
            message: "Server Error!"
        })
    }

}

// Create a new To-Do and add it to the database
const createTodo = async (req: Request,  res: Response, next: NextFunction) => {
    const {name , description} = req.body;

    if(name == undefined && name === "") {
        return res.status(400).json({
            success: false,
            message: "Bad request"
        })
    }

    const newTodo : ITodo = {
        name : name,
        description : description,
        createdAt: new Date(),
        isCompleted: false
    }

    try {
        await ToDoModel.create(newTodo);
        
        return res.status(200).json({
            success: true,
            message: "To-Do Added Successfully!"
        })
        
    }
    catch (e) {
        if(e instanceof Error){
            console.log(e.message);
        }
        if(e instanceof Error && e.name == "MongoServerError") {
            return res.status(422).json({
                success: false,
                message: "The name of the To-Do must be unique!"
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Server Error!"
            })
        }
    }
}

// Update a single To-Do from the database by passing its ID
const updateTodo = async(req: Request, res : Response, next: NextFunction)=> {
    const {name, description, isCompleted} = req.body;
    const {id} = req.params;

    const updatedTodo : ITodo = {
        name : name,
        description : description,
        isCompleted: isCompleted
    }

    try {
       const newTodo = await ToDoModel.findByIdAndUpdate(id, updatedTodo, {new: true});

       if(newTodo) {
            return res.status(200).json({
                success: true,
                message: "To-Do Updated Successfully!"
            })
       }
       else {
            return res.status(404).json({
                success: false,
                message: "No To-Do with given ID found!"
            }) 
       }
    }
    catch(e) {
        if(e instanceof Error) {
            console.log(e.message);
        }
        if(e instanceof Error && e.name === "MongoServerError") {
            return res.status(422).json({
                success: false,
                message: "The name of the To-Do must be unique!"
            })
        }
        else if(e instanceof mongoose.Error && e.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Bad request!"
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Server Error!"
            })
        }
    }
} 

// Delete a single To-Do from the database by passing its ID
const deleteTodo  = async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try {
        const deletedTodo = await ToDoModel.findByIdAndDelete(id);

        if(deletedTodo) {
            return res.status(200).json({
                success: true,
                message: "To-Do Deleted Successfully!"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "No To-Do with given ID found!"
            }) 
        }

    }
    catch(e) {
        if(e instanceof Error) {
            console.log(e.message);
        }
        if(e instanceof mongoose.Error && e.name === "CastError") {
            return res.status(404).json({
                success: false,
                message: "No such To-Do exists!"
            })
        }
        return res.status(500).json({
            success: false,
            message: "Server Error!"
        })
    }
}

export default {getTodos, createTodo, updateTodo, deleteTodo, getTodoById};