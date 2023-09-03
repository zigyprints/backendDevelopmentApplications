import { Document } from "mongoose"

//creating generic type of our todo schema
interface MyTodo extends Document {
    title: string,
    desc: string
}
export default MyTodo