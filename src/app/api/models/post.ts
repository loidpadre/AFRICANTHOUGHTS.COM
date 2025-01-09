import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
    nameUser:{
        type: String,
        required: true
    },
    imageUser:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,  
    },
    description: {
        type: String,
        required: true,  
    },
    category: {
        type: String,
        required: true,  
    },
    autor: {
        type: mongoose.Types.ObjectId,
        ref: 'User', 
    }
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export {Post}
