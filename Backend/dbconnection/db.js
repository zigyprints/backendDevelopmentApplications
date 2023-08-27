let mongoose = require('mongoose');

// dotenv file req
require('dotenv').config();

// url to connect to database
let mongoURL = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.h3xovr7.mongodb.net/?retryWrites=true&w=majority`;

const mongodb = async () => {

   mongoose.set('strictQuery', true);
 
   await mongoose.connect(mongoURL).then(()=>{
    console.log("Database connection done");
})
.catch((err)=>{
    console.error(err.message);
});
}

module.exports = mongodb;