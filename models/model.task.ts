import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

//Creating the basic structure of the database of the tasks to be added on the web application:

const Tasks = new mongoose.Schema({

   taskId: {

    type: Number // Although MongoDb provides its own unique id accessed by {._id} but initially without frontend, we need to specifiy the id manually in case of updating or deleting and exisiting entry through postman.

   },

    taskName: {
        type: String
    },

    taskDescription: {
        type: String
    },

    isCompleted: {

        type: Boolean
    }

},
    {
        timestamps: true,
    }
);

const Task = mongoose.model("newTask",Tasks);

export default Task;