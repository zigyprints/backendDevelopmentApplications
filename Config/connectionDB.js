const mongoose = require('mongoose');
const env = require('dotenv');

env.config(); //Processing connection string from dotenv file
const connectionString = process.env.CONNECTION_STRING;

const DBConnect = async () => {
    try {
        const connect = await mongoose.connect(connectionString);
        console.log("sucessfully connected to Database: ", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = DBConnect;