import {Schema, model, connect} from 'mongoose';

interface userModel {
    username:string;
    password:string
}

const userSchema = new Schema<userModel> ({
    username:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
    }
});

const User = model<userModel>('users', userSchema);
connect('mongodb://localhost:27017/munish_assignment').then(()=>console.log('mongoose connected'));

export default User;