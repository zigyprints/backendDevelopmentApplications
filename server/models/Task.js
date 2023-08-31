const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({

    name:{
        type:String,  
        required:[true,'must provide name'],     // This validates name ki wo toh likhni hi padegi
        trim:true,   //To avoide unescessary spaces
        maxlength:[20,'max characters in mae can be 20']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('Task',TaskSchema);