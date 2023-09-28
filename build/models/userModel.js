import { Schema, model, connect } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});
const User = model('users', userSchema);
connect('mongodb://localhost:27017/munish_assignment').then(() => console.log('mongoose connected'));
export default User;
