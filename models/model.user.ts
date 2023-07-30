import mongoose from "mongoose";


const User = new mongoose.Schema({

    userId: {
        
        type: Number
    },

    userEmail : {

        type: String

    },

    userName: {

        type: String
    },

    userPassword: {

        type: String
    }

});

const myUser =  mongoose.model("myUser",User);

export default myUser;
