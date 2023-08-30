import  mongoose  from "mongoose";
// import { boolean } from "webidl-conversions";

export const connectDB = (url: string) => {                            //use strict typing here.........................
    return mongoose.connect(url, {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    })
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
//   export default {connectDB, taskSchema};