import todomodel from "../models/todoModel";
import { Request, Response } from "express";
import MyTodo from "../utils/schemaType";

//controller for creating todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { todo, description } = req.body;
        const data: MyTodo = await todomodel.create({
            title: todo,
            desc: description
        })
        if (data) {
            res.send({ success: true, message: "successfully created data in database", data: data })
        } else {
            res.send({ success: false, message: "Data has not been created in the databse" })
        }
    } catch (err) {
        res.send({ success: false, message: "Some error occured while creating the data in the database" })
    }
}

//controller for updating the todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, updatedTodo, updatedDesc } = req.body;
        const updatedData = await todomodel.updateOne({ _id: id }, {
            $set: {
                title: updatedTodo,
                desc: updatedDesc
            }
        })
        if (updatedData) {
            const getUpdatedData = await todomodel.findById({
                _id: id
            })
            res.send({ success: true, message: "successfully updated the data in database", data: getUpdatedData })
        } else {
            res.send({ success: false, message: "Data has not been updated the data in database" })
        }

    } catch (err) {
        res.send({ success: false, message: "Some error occured while updating the data in the database" })
    }
}

//controller for getting all todos
export const getTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const getdata: MyTodo[] = await todomodel.find()
        if (getdata) {
            res.send({ success: true, message: "successfully got data from the database", data: getdata })
        } else {
            res.send({ success: false, message: "There is no data you are looking for" })
        }

    } catch (err) {
        res.send({ success: false, message: "Some error occured while getting the data from the database" })
    }
}
//controller for deleting todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        const deleteddata = await todomodel.deleteOne({
            _id: id
        })
        if (deleteddata) {
            res.send({ success: true, message: "successfully deleted  data in theb database", data: deleteddata })
        } else {
            res.send({ success: false, message: "thereis no data that you wants to delete" })
        }

    } catch (err) {
        res.send({ success: false, message: "Some error occured while deleting the data from the database" })
    }
}