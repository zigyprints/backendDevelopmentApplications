let mongoose = require('mongoose');

// dotenv file req
require('dotenv').config();

// url to connect to database
let moongoseurl = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.h3xovr7.mongodb.net/?retryWrites=true&w=majority`;

const mongodb = async () => {

    console.log("before connecting");
    // strictquery setup
   mongoose.set('strictQuery', true);
 
   console.log("after strictquery");
    try {
        await mongoose.connect(moongoseurl).then(()=>{console.log("connected DB");})
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = mongodb;