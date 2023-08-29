import { Document } from "mongoose"


// Todo Document Interface
export interface ITodo extends Document{
    name : string,
    description : string,
    status : boolean
}
