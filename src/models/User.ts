import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  displayName: string; // User's display name
  email: string; // User's email address
  password: string; //password
  photoURL: string; // URL to the user's profile picture
  createdAt: Date; // User registration date
}

const userSchema: Schema<IUser> = new Schema({
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
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
