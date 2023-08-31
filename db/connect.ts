import  mongoose  from "mongoose";
// import { boolean } from "webidl-conversions";

export const connectDB = (url: string) => {                          
    return mongoose.connect(url);
  }

  const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:[true, "Please provide a value"],
        minLength:3
    },
    completed: {
        type:Boolean,
        default:false
    }
  })

  export default mongoose.model('task', taskSchema);
