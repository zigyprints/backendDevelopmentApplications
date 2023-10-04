const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB ${connect.connection.host}`);
    }
    catch(err){
        console.log(`Error: ${err.message}`);
        process.exit();
    }
};
module.exports = connectDB;