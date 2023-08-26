let mongoose = require('mongoose');

// dotenv file req
require('dotenv').config();

// url to connect to database
let moongoseurl = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.h3xovr7.mongodb.net/?retryWrites=true&w=majority`;

const mongodb = async () => {

    // strictquery setup
    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect(moongoseurl);
        console.log("connected DB");
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = mongodb;