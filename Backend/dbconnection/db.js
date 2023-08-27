let mongoose = require('mongoose');

// dotenv file req
require('dotenv').config();

// url to connect to database
let mongoURL = `mongodb+srv://rishabhluv:fnRyybKZ3T79IEOo@cluster0.h3xovr7.mongodb.net/?retryWrites=true&w=majority`;

const mongodb = async () => {

   mongoose.set('strictQuery', true);
 
   await mongoose.connect(mongoURL).then(()=>{
    console.log("Database connection successfull");
})
.catch((err)=>{
    console.error(err.message);
});
}

module.exports = mongodb;