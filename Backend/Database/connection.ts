import mongoose from "mongoose"

const connectDB = async () => {
    if (process.env.Mongo_URL) {
        try {
            mongoose.connect(process.env.Mongo_URL)
            console.log("Database is connected ....")
        } catch (error) {
            console.log("Error in connecting DataBase ....")
        }
    }
    else console.log("No Connection String Provided to Connect to DataBase ...")
}

export default connectDB 