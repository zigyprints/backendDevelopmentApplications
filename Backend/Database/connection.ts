import mongoose from "mongoose"

const connectDB = async () => {
    if (process.env.Mongo_URL) {
        mongoose.connect(process.env.Mongo_URL)
        console.log("Database is connected ....")
    }
    else console.log("Not Connectd in connection ts ...");
    // handle error here ....
}

export default connectDB 