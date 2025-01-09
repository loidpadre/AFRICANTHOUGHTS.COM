import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    googleID:{
        type: String,

    }

},{timestamps: true})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export {User}