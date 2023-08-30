const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    subject:{
        type:String,
        required :true,  
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        enum:['Pending','Finish'],
        default:'Pending',
    },
},
{timestamps:true},
);