const mongoose = require('mongoose');
const {Schema} = mongoose ;
const Notes = new Schema({
    Title:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    }
})
// module.exports = Notes;
module.exports = mongoose.model('Notes',Notes);
   // email:{
    //     type:String,
    //     require:true,
    //     unique:true
    // },