import mongoose from "mongoose";

const connectDB = async () => {

    await mongoose.connect(process.env.MONGO_URL!).then(() => {
        console.log("database connected succesfully")
    })
}

export default connectDB;