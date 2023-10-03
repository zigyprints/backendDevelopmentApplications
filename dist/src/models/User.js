import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    photoURL: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map